<script setup lang="ts">
import { useRoute } from 'vue-router';
import CommonSection from '../components/CommonSection.vue';
import PageFadeUp from '../components/pageFadeUp.vue';
import H1Heading from '../ui/H1-heading.vue';
import { computed, onMounted, ref } from 'vue';
import { getWorksBySlug } from '../api/articles';
import type { Work, SkillData } from '../types';
import skillJson from "../data/skills.json";
import DOMPurify from 'dompurify';

const route = useRoute();
const articles = ref<Work[]>([]);
const skillData = ref<SkillData>(skillJson);

function getMatchedIcons(names: string[], source: { name: string, iconUrl: string }[]): { name: string; iconUrl: string }[] {
  return names.flatMap((name) => 
    source
      .filter((item) => item.name === name)
      .map((item) => ({ name: item.name, iconUrl: item.iconUrl}))
  );
}

const matchedBasicSkillIcons = computed(() => {
  const basicSkills = skillData.value.basicSkill.content.flatMap((category) =>
    Object.values(category).flatMap((skillCategory) => skillCategory.content)
  );
  return getMatchedIcons(articles.value[0]?.basicSkill || [], basicSkills);
});
const matchedSubSkillIcons = computed(() => {
  return getMatchedIcons(articles.value[0]?.subSkill || [], skillData.value.subSkill.content);
});
const matchedToolIcons = computed(() => {
  return getMatchedIcons(articles.value[0]?.tools || [], skillData.value.tool.content)
});

const sanitizedDetail = computed(() => {
  return articles.value[0]?.detail ? DOMPurify.sanitize(articles.value[0].detail) : '';
});

onMounted(async (): Promise<void> => {
  const slugParam = route.params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  if (!slug) return;
  const data = await getWorksBySlug(slug);
  if (data) {
    articles.value = data.contents;
  }
});
</script>

<template>
  <PageFadeUp>
    <H1Heading title="Works" subtitle="成果物ギャラリー" />
    <CommonSection class="flex flex-col-reverse items-center md:flex-row-reverse gap-12 md:gap-[4.348%]">
      <div class="w-full md:w-3/5">
        <h2 class="font-bold text-[20px]">{{ articles[0]?.title }}</h2>
        <p class="mt-4">{{ articles[0]?.summary }}</p>
        <table class="relative border w-full border-main mt-10">
          <caption class="absolute top-[-16px] left-6 bg-bg px-[1em] font-bold">使用技術</caption>
          <tbody>
            <tr class="border-b border-gray-400">
              <th class="w-25 md:w-28 text-sm font-normal text-left p-[1em] max-md:pr-[0.5em]">必須スキル</th>
              <td class="p-[1em] max-md:pl-[0.5em] flex flex-wrap gap-4">
                <div
                  v-for="(icon, index) in matchedBasicSkillIcons"
                  :key="`basic-${index}`"
                  class="flex flex-col items-center max-md:w-[80px]"
                >
                  <img
                    v-if="matchedBasicSkillIcons.length !== 0"
                    :src="icon.iconUrl"
                    :alt="icon.name"
                    v-tooltip="{
                      content: icon.name,
                      placement: 'top',
                      theme: 'material',
                      animation: 'shift-away',
                      arrow: true
                    }"
                    class="min-w-12 max-w-14 h-12"
                  />
                  <span v-else>－</span>
                  <span class="text-xs mt-1 block md:hidden text-center">{{ icon.name }}</span>
                </div>
              </td>
            </tr>
            <tr class="border-b border-gray-400">
              <th class="w-25 md:w-28 text-sm font-normal text-left p-[1em] max-md:pr-[0.5em]">補助スキル</th>
              <td class="p-[1em] max-md:pl-[0.5em] flex flex-wrap gap-3">
                <div
                  v-for="(icon, index) in matchedSubSkillIcons"
                  :key="`basic-${index}`"
                  class="flex flex-col items-center max-md:w-[80px]"
                >
                  <img
                    v-if="matchedSubSkillIcons.length !== 0"
                    :src="icon.iconUrl"
                    :alt="icon.name"
                    v-tooltip="{
                      content: icon.name,
                      placement: 'top',
                      theme: 'material',
                      animation: 'shift-away',
                      arrow: true
                    }"
                    class="min-w-12 max-w-14 h-12"
                  />
                  <span v-else>－</span>
                  <span class="text-xs mt-1 block md:hidden text-center">{{ icon.name }}</span>
                </div>
              </td>
            </tr>
            <tr>
              <th class="w-25 md:w-28 text-sm font-normal text-left p-[1em] max-md:pr-[0.5em]">業務効率化ツール</th>
              <td class="p-[1em] max-md:pl-[0.5em] flex flex-wrap gap-3">
                <div
                  v-for="(icon, index) in matchedToolIcons"
                  :key="`basic-${index}`"
                  class="flex flex-col items-center max-md:w-[80px]"
                >
                  <img
                    v-if="matchedToolIcons.length !== 0"
                    :src="icon.iconUrl"
                    :alt="icon.name"
                    v-tooltip="{
                      content: icon.name,
                      placement: 'top',
                      theme: 'material',
                      animation: 'shift-away',
                      arrow: true
                    }"
                    class="min-w-12 max-w-14 h-12"
                  />
                  <span v-else>－</span>
                  <span class="text-xs mt-1 block md:hidden text-center">{{ icon.name }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure class="w-full md:w-2/5">
        <img class="w-full aspect-[4/3] object-cover" :src="`${articles[0]?.thumbnail.url}`" width="4" height="3" alt="" />
      </figure>
    </CommonSection>

    <CommonSection>
      <dl class="max-w-4xl mx-auto">
        <div class="grid grid-cols-[23.5%_1fr] md:grid-cols-[200px_1fr] items-center gap-5 pb-4 border-b border-b-main">
          <dt>開発・運営担当期間</dt>
          <dd>{{ articles[0]?.period }}</dd>
        </div>
        <div class="grid grid-cols-[23.5%_1fr] md:grid-cols-[200px_1fr] items-center gap-5 py-4 border-b border-b-main">
          <dt>開発規模</dt>
          <dd>{{ articles[0]?.devScale }}</dd>
        </div>
        <div class="grid grid-cols-[23.5%_1fr] md:grid-cols-[200px_1fr] items-center gap-5 py-4 border-b border-b-main">
          <dt>担当ポジション</dt>
          <dd>{{ articles[0]?.position }}</dd>
        </div>
        <div class="grid grid-cols-[23.5%_1fr] md:grid-cols-[200px_1fr] items-center gap-5 pt-4">
          <dt>概要</dt>
          <dd>
            <div v-html="sanitizedDetail"></div>
          </dd>
        </div>
      </dl>
    </CommonSection>
  </PageFadeUp>
</template>