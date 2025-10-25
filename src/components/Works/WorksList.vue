<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  articles: {
    id: string;
    slug: string;
    title: string;
    thumbnail: { url: string };
    basicSkill: string[];
  }[];
}>();

const isLoadedMap = ref<Record<string, boolean>>({});
</script>

<template>
  <div v-if="props.articles?.length !== 0" class="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-[32px_24px] @4xl:gap-12 mt-10">
    <article v-for="article in props.articles" :key="article.id" class="fadeTarget fadeUp" v-intersect>
      <RouterLink class="worksList grid" :to="`/works/${article.slug}`">
        <h3 class="worksList-title order-2 font-medium mt-3">{{ article.title }}</h3>
        <div v-show="!isLoadedMap[article.id]" class="bg-gray-300 animate-pulse w-[336px] h-[252px] rounded-md absolute z-10"></div>
        <figure class="worksList-image order-1 relative">
          <img class="w-full aspect-[4/3] object-cover" :src="`${article.thumbnail.url}`" :width="336" :height="252" alt="" loading="eager" @load="isLoadedMap[article.id] = true" />
        </figure>
        <p class="worksList-skill mt-0.5 order-3 text-[13px]/[1.6] text-gray-500">{{ article.basicSkill.join(",").replace(/,/g, ", ") }}</p>
      </RouterLink>
    </article>
  </div>
  <div v-else class="mt-10 fadeTarget fadeUp">
    <p>データがありません。</p>
  </div>
</template>