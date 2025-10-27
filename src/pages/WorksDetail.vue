<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import CommonSection from '../components/CommonSection.vue';
import PageFadeUp from '../components/pageFadeUp.vue';
import H1Heading from '../ui/H1-heading.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { getAdjacentWorks, getWorksBySlug } from '../api/articles';
import type { Work, SkillData } from '../types';
import skillJson from "../data/skills.json";
import DOMPurify from 'dompurify';
import { useHead } from '@unhead/vue';

const route = useRoute();
const articles = ref<Work[]>([]);
const skillData = ref<SkillData>(skillJson);
const prevWork = ref<Work | null>(null);
const nextWork = ref<Work | null>(null);
const dynamicTitle = ref("Works | TOORU KATSUMATA Web Portfolio");
const descContent = ref("これまでの業務や趣味で開発したサイトの成果物を掲載しております。")

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

const getWorkCategoryClass = (category: string) => {
  return category === '業務実績' ? 'bg-[#00002F]' : 'bg-[#AD0065]';
}

useHead({
  title: dynamicTitle,
  meta: [
    {
      name: "description",
      content: descContent,
    },
  ],
});

const fetchWork = async (slug: string) => {
  const data = await getWorksBySlug(slug);
  if (data) {
    articles.value = data.contents;

    const title = data.contents[0]?.title;
    if (title) {
      dynamicTitle.value = `${title} | TOORU KATSUMATA Web Portfolio`;
      descContent.value = `成果物「${title}」の詳細を掲載しております。`
    }

    const publishedAt = data.contents[0]?.publishedAt;
    if (publishedAt) {
      const adjacent = await getAdjacentWorks(publishedAt);
      prevWork.value = adjacent.prev;
      nextWork.value = adjacent.next;
    }
  }
};

onMounted(async (): Promise<void> => {
  const slugParam = route.params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  if (slug) fetchWork(slug);
});

watch(() => route.params.slug, (newSlug) => {
  const slug = Array.isArray(newSlug) ? newSlug[0] : newSlug;
  if (slug) fetchWork(slug);
});
</script>

<template>
  <PageFadeUp>
    <H1Heading title="Works" subtitle="成果物ギャラリー" />
    <CommonSection class="flex flex-col-reverse items-center md:flex-row-reverse gap-12 md:gap-[4.348%]">
      <div class="w-full md:w-3/5 fadeTarget fadeRight" v-intersect>
        <span
          class="order-2 mt-4 text-white text-sm inline-block w-fit p-[3px_20px_4px] rounded-sm"
          :class="getWorkCategoryClass(articles[0]?.workCategory[0] ?? '')"
        >{{ articles[0]?.workCategory[0] ?? '' }}</span>
        <h2 class="font-bold text-[20px]/[1.6] mt-2">{{ articles[0]?.title }}</h2>
        <p class="mt-4">{{ articles[0]?.summary }}</p>
        <table class="relative border w-full border-main mt-12 md:mt-10">
          <caption class="absolute top-[-16px] left-6 bg-bg px-[1em] font-bold">使用技術</caption>
          <tbody>
            <tr class="border-b border-main">
              <th scope="row" class="w-25 md:w-28 text-sm font-normal text-left p-[1em] max-md:pr-[0.5em]">必須スキル</th>
              <td class="p-[1em] max-md:pl-[0.5em] flex flex-wrap gap-4">
                <template v-if="matchedBasicSkillIcons.length > 0">
                  <div
                    v-for="(icon, index) in matchedBasicSkillIcons"
                    :key="`basic-${icon.name}-${index}`"
                    class="flex flex-col items-center max-md:w-[80px]"
                  >
                    <img
                      :src="icon.iconUrl"
                      :alt="icon.name"
                      :aria-label="icon.name"
                      v-tooltip="{
                        content: icon.name,
                        placement: 'top',
                        theme: 'material',
                        animation: 'shift-away',
                        arrow: true
                      }"
                      class="min-w-12 max-w-14 h-12"
                    />
                    <span aria-hidden="true" class="text-xs mt-1 block md:hidden text-center">{{ icon.name }}</span>
                  </div>
                </template>
                <template v-else>
                  <span>－</span>
                </template>
              </td>
            </tr>
            <tr class="border-b border-main">
              <th scope="row" class="w-25 md:w-28 text-sm font-normal text-left p-[1em] max-md:pr-[0.5em]">補助スキル</th>
              <td class="p-[1em] max-md:pl-[0.5em] flex flex-wrap gap-3">
                <template v-if="matchedSubSkillIcons.length > 0">
                  <div
                    v-for="(icon, index) in matchedSubSkillIcons"
                    :key="`basic-${icon.name}-${index}`"
                    class="flex flex-col items-center max-md:w-[80px]"
                  >
                    <img
                      :src="icon.iconUrl"
                      :alt="icon.name"
                      :aria-label="icon.name"
                      v-tooltip="{
                        content: icon.name,
                        placement: 'top',
                        theme: 'material',
                        animation: 'shift-away',
                        arrow: true
                      }"
                      class="min-w-12 max-w-14 h-12"
                    />
                    <span aria-hidden="true" class="text-xs mt-1 block md:hidden text-center">{{ icon.name }}</span>
                  </div>
                </template>
                <template v-else>
                  <span>－</span>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" class="w-25 md:w-28 text-sm font-normal text-left p-[1em] max-md:pr-[0.5em]">業務効率化ツール</th>
              <td class="p-[1em] max-md:pl-[0.5em] flex flex-wrap gap-3">
                <template v-if="matchedToolIcons.length > 0">
                  <div
                    v-for="(icon, index) in matchedToolIcons"
                    :key="`basic-${icon.name}-${index}`"
                    class="flex flex-col items-center max-md:w-[80px]"
                  >
                    <img
                      v-if="matchedToolIcons.length !== 0"
                      :src="icon.iconUrl"
                      :alt="icon.name"
                      :aria-label="icon.name"
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
                    <span aria-hidden="true" class="text-xs mt-1 block md:hidden text-center">{{ icon.name }}</span>
                  </div>
                </template>
                <template v-else>
                  <span>－</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure class="w-full md:w-2/5 fadeTarget fadeLeft" v-intersect>
        <img
          class="w-full aspect-[4/3] object-cover"
          :src="`${articles[0]?.thumbnail.url}`"
          width="712"
          height="534"
          :alt="`成果物「${articles[0]?.title}」のサムネイル画像`"
          loading="eager"
        />
      </figure>
    </CommonSection>

    <CommonSection>
      <dl class="max-w-4xl mx-auto fadeTarget fadeUp" v-intersect>
        <div role="group" aria-labelledby="period" class="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-5 pb-4 border-b border-gray-600">
          <dt id="period" class="font-bold">開発・運営担当期間</dt>
          <dd class="max-md:ml-[1em]">{{ articles[0]?.period }}</dd>
        </div>
        <div role="group" aria-labelledby="devScale" v-if="articles[0]?.devScale" class="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-5 py-4 border-b border-gray-600">
          <dt id="devScale" class="font-bold">開発規模</dt>
          <dd class="max-md:ml-[1em]">{{ articles[0]?.devScale }}</dd>
        </div>
        <div role="group" aria-labelledby="position" class="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-5 py-4 border-b border-gray-600">
          <dt id="position" class="font-bold">担当ポジション</dt>
          <dd class="max-md:ml-[1em]">{{ articles[0]?.position }}</dd>
        </div>
        <div role="group" aria-labelledby="detail" class="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-5 pt-4">
          <dt id="detail" class="font-bold">概要</dt>
          <dd class="max-md:ml-[1em]">
            <div v-html="sanitizedDetail"></div>
          </dd>
        </div>
      </dl>
    </CommonSection>

    <CommonSection>
      <div class="worksPagination fadeTarget fadeUp" v-intersect>
        <RouterLink
          v-if="prevWork"
          :to="`/works/${prevWork.slug}`"
          class="worksPagination-item worksPagination-item__prev"
          :aria-label="`前の成果物：${prevWork.title}`"
        >
          <div class="worksPagination-body">
            <span class="worksPagination-title">Prev</span>
            <span class="worksPagination-text">{{ prevWork.title }}</span>
          </div>
        </RouterLink>
        <div></div>
        <RouterLink
          v-if="nextWork"
          :to="`/works/${nextWork.slug}`"
          class="worksPagination-item worksPagination-item__next"
          :aria-label="`次の成果物：${nextWork.title}`"
        >
          <div class="worksPagination-body">
            <span class="worksPagination-title">Next</span>
            <span class="worksPagination-text">{{ nextWork.title }}</span>
          </div>
        </RouterLink>
      </div>
    </CommonSection>
  </PageFadeUp>
</template>
