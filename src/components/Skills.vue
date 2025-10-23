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
  <!-- 必須スキル -->
  <section v-if="props.basicSkill">
    <h2 class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.basicSkill.title }}</h2>
    <section v-for="(category, key) in skillData.basicSkill.content[0]" class="mt-6 @container" :key="key">
      <h3 class="fadeTarget fadeUp text-accent font-medium before:content-['◎'] text-[18px] before:mr-1" v-intersect>{{ category.title }}</h3>
      <ul class="fadeTarget fadeUp grid @max-md:grid-cols-1 grid-cols-[repeat(auto-fill,200px)] items-start gap-5 mt-3" v-intersect>
        <li v-for="item in category.content" class="grid grid-rows-subgrid row-span-4 border border-gray-400 shadow-[0_0_5px_rgb(128_128_128_/_0.5)] rounded-xl gap-0 skillTarget" :key="item.id">
          <figure class="place-content-center p-3 border-b border-b-gray-400">
            <img class="skill-icon" :src="item.iconUrl" width="56" height="56" alt="" />
          </figure>
          <div class="grid grid-rows-subgrid row-span-3 p-[6px_12px_8px_12px]">
            <p class="font-medium leading-[1.4]">{{ item.name }}</p>
            <div :class="`skill-bar level-${item.level}`">
              <span>Lv.{{ item.level }}</span>
            </div>
            <p class="text-[14px]/[1.6] mt-2">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>

  <!-- 補助スキル -->
  <section v-if="props.subSkill" class="mt-16">
    <h2 class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.subSkill.title }}</h2>
    <section class="mt-6 @container">
      <ul class="fadeTarget fadeUp grid @max-md:grid-cols-1 grid-cols-[repeat(auto-fill,200px)] items-start gap-5 mt-3" v-intersect>
        <li v-for="item in skillData.subSkill.content" class="grid grid-rows-subgrid row-span-4 border border-gray-400 shadow-[0_0_5px_rgb(128_128_128_/_0.5)] rounded-xl gap-0 skillTarget" :key="item.id">
          <figure class="place-content-center p-3 border-b border-b-gray-400">
            <img class="skill-icon" :src="item.iconUrl" width="56" height="56" alt="" />
          </figure>
          <div class="grid grid-rows-subgrid row-span-3 p-[6px_12px_8px_12px]">
            <p class="font-medium leading-[1.4]">
              {{ item.name }}<br /><span class="inline-block text-[13px] text-gray-500">{{ item.type }}</span>
            </p>
            <div :class="`skill-bar level-${item.level}`">
              <span>Lv.{{ item.level }}</span>
            </div>
            <p class="text-[14px]/[1.6] mt-2">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>

  <!-- ツール -->
  <section v-if="props.tool" class="mt-16">
    <h2 class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.tool.title }}</h2>
    <section class="mt-6 @container">
      <ul class="fadeTarget fadeUp grid @max-md:grid-cols-1 grid-cols-[repeat(auto-fill,200px)] items-start gap-5 mt-3" v-intersect>
        <li v-for="item in skillData.tool.content" class="grid grid-rows-subgrid row-span-4 border border-gray-400 shadow-[0_0_5px_rgb(128_128_128_/_0.5)] rounded-xl gap-0 skillTarget" :key="item.id">
          <figure class="place-content-center p-3 border-b border-b-gray-400">
            <img class="skill-icon" :src="item.iconUrl" width="56" height="56" alt="" />
          </figure>
          <div class="grid grid-rows-subgrid row-span-3 p-[6px_12px_8px_12px]">
            <p class="font-medium leading-[1.4]">
              {{ item.name }}<br /><span class="inline-block text-[13px] text-gray-500">{{ item.type }}</span>
            </p>
            <p class="text-[14px]/[1.6] mt-2">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>

  <!-- 資格 -->
  <section v-if="props.qualification" class="mt-16">
    <h2 class="fadeTarget fadeUp text-accent font-bold text-[20px]/[1.6] pl-3 border-l-4 border-accent" v-intersect>{{ skillData.qualification.title }}</h2>
    <section class="mt-6">
      <ul class="fadeTarget fadeUp list-disc ml-[1em]" v-intersect>
        <li v-for="q in skillData.qualification.content" class="not-first-of-type:mt-1">{{ q.name }}（{{ q.date }}）</li>
      </ul>
    </section>
  </section>
</template>
