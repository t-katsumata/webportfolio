<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { SkillData } from "../types";
import skillJson from "../data/skills.json";

const props = defineProps({
  basicSkill: Boolean,
  subSkill: Boolean,
  tool: Boolean,
  qualification: Boolean
});

const skillData = ref<SkillData>(skillJson);

onMounted(() => {
  const targetElements = document.querySelectorAll<HTMLElement>(".skillTarget");

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("isActive");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -20% 0px",
    }
  );

  targetElements.forEach((target) => observer.observe(target));
});
</script>

<template>
  <section :aria-labelledby="`skill-level-detail`" class="mt-10">
    <h2 id="skill-level-detail" class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>各スキルレベルの詳細</h2>
    <ol aria-label="各スキルレベル" class="mt-6 fadeTarget fadeUp" v-intersect>
      <li>Lv.1：触り程度、今後使いこなしたいスキル</li>
      <li>Lv.2：独学で使用経験あり</li>
      <li>Lv.3：実務で使用経験あり</li>
      <li>Lv.4：実務で３年以上使用経験あり</li>
      <li>Lv.5：実務でも独学でも長く使用経験あり</li>
    </ol>
  </section>

  <!-- 必須スキル -->
  <section :aria-labelledby="`basicSkill-title`" v-if="props.basicSkill" class="mt-16">
    <h2 id="basicSkill-title" class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.basicSkill.title }}</h2>
    <section v-for="(category, key) in skillData.basicSkill.content[0]" class="mt-6 @container" :key="key">
      <h3 class="fadeTarget fadeUp text-accent font-medium before:content-['◎'] text-[18px] before:mr-1" v-intersect>{{ category.title }}</h3>
      <ul class="fadeTarget fadeUp grid @max-md:grid-cols-1 grid-cols-[repeat(auto-fill,200px)] items-start gap-5 mt-3" v-intersect>
        <li role="listitem" v-for="item in category.content" class="grid grid-rows-subgrid row-span-4 border border-gray-600 shadow-[0_0_5px_rgb(128_128_128_/_0.5)] rounded-xl gap-0 skillTarget" :key="item.id">
          <figure class="place-content-center p-3 border-b border-b-gray-600">
            <img class="skill-icon" :src="item.iconUrl" width="56" height="56" alt="" />
          </figure>
          <div class="grid grid-rows-subgrid row-span-3 p-[6px_12px_8px_12px]">
            <h4 class="font-medium leading-[1.4]">{{ item.name }}</h4>
            <div :aria-label="`スキルレベル ${item.level}`" :class="`skill-bar level-${item.level}`">
              <span>Lv.{{ item.level }}</span>
            </div>
            <p class="text-[14px]/[1.6] mt-2">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>

  <!-- 補助スキル -->
  <section :aria-labelledby="`subSkill-title`" v-if="props.subSkill" class="mt-16">
    <h2 id="subSkill-title" class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.subSkill.title }}</h2>
    <section class="mt-6 @container">
      <ul class="fadeTarget fadeUp grid @max-md:grid-cols-1 grid-cols-[repeat(auto-fill,200px)] items-start gap-5 mt-3" v-intersect>
        <li role="listitem" v-for="item in skillData.subSkill.content" class="grid grid-rows-subgrid row-span-5 border border-gray-600 shadow-[0_0_5px_rgb(128_128_128_/_0.5)] rounded-xl gap-0 skillTarget" :key="item.id">
          <figure class="place-content-center p-3 border-b border-b-gray-600">
            <img class="skill-icon" :src="item.iconUrl" width="56" height="56" alt="" />
          </figure>
          <div class="grid grid-rows-subgrid row-span-4 p-[6px_12px_8px_12px]">
            <h4 class="font-medium leading-[1.4]">{{ item.name }}</h4>
            <span class="block text-[13px] text-gray-600">{{ item.type }}</span>
            <div :aria-label="`スキルレベル ${item.level}`" :class="`skill-bar level-${item.level}`">
              <span>Lv.{{ item.level }}</span>
            </div>
            <p class="text-[14px]/[1.6] mt-2">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>

  <!-- ツール -->
  <section :aria-labelledby="`tool-title`" v-if="props.tool" class="mt-16">
    <h2 id="tool-title" class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.tool.title }}</h2>
    <section class="mt-6 @container">
      <ul class="fadeTarget fadeUp grid @max-md:grid-cols-1 grid-cols-[repeat(auto-fill,200px)] items-start gap-5 mt-3" v-intersect>
        <li role="listitem" v-for="item in skillData.tool.content" class="grid grid-rows-subgrid row-span-4 border border-gray-600 shadow-[0_0_5px_rgb(128_128_128_/_0.5)] rounded-xl gap-0 skillTarget" :key="item.id">
          <figure class="place-content-center p-3 border-b border-b-gray-600">
            <img class="skill-icon" :src="item.iconUrl" width="56" height="56" alt="" />
          </figure>
          <div class="grid grid-rows-subgrid row-span-3 p-[6px_12px_8px_12px]">
            <h4 class="font-medium leading-[1.4]">{{ item.name }}</h4>
            <span class="block text-[13px] text-gray-600">{{ item.type }}</span>
            <p class="text-[14px]/[1.6] mt-2">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>

  <!-- 資格 -->
  <section :aria-labelledby="`qualification-title`" v-if="props.qualification" class="mt-16">
    <h2 id="qualification-title" class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.qualification.title }}</h2>
    <section class="mt-6">
      <ul class="fadeTarget fadeUp list-disc ml-[1em]" v-intersect>
        <li role="listitem" v-for="q in skillData.qualification.content" class="not-first-of-type:mt-1">
          <h3>{{ q.name }}（{{ q.date }}）</h3>
        </li>
      </ul>
    </section>
  </section>
</template>
