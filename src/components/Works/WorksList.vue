<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  articles: {
    id: string;
    workCategory: string[];
    slug: string;
    title: string;
    thumbnail: { url: string };
    basicSkill: string[];
  }[];
}>();

const isLoadedMap = ref<Record<string, boolean>>({});

const getWorkCategoryClass = (category: string) => {
  return category === '業務実績' ? 'bg-[#00002F]' : 'bg-[#BF0071]';
}
</script>

<template>
  <div v-if="props.articles?.length !== 0" class="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-[32px_24px] @4xl:gap-12 mt-10">
    <article v-for="article in props.articles" :key="article.id" class="fadeTarget fadeUp" v-intersect>
      <RouterLink class="worksList grid" :to="`/works/${article.slug}`">
        <span
          class="order-2 mt-4 text-white text-sm inline-block w-fit p-[2px_16px_3px] rounded-sm"
          :class="getWorkCategoryClass(article.workCategory[0] ?? '')"
        >{{ article.workCategory[0] ?? '' }}</span>
        <h3 class="worksList-title order-3 font-medium mt-1">{{ article.title }}</h3>
        <div v-show="!isLoadedMap[article.id]" class="bg-gray-300 animate-pulse w-[336px] h-[252px] rounded-md absolute z-10"></div>
        <figure class="worksList-image order-1 relative">
          <img class="w-full aspect-[4/3] object-cover" :src="`${article.thumbnail.url}`" :width="336" :height="252" alt="" loading="eager" @load="isLoadedMap[article.id] = true" />
        </figure>
        <p class="worksList-skill mt-0.5 order-4 text-[13px]/[1.6] text-gray-500">{{ article.basicSkill.join(",").replace(/,/g, ", ") }}</p>
      </RouterLink>
    </article>
  </div>
  <div v-else class="mt-10 fadeTarget fadeUp">
    <p>データがありません。</p>
  </div>
</template>