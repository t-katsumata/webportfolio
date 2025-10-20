<script setup lang="ts">
const props = defineProps({
  articles: Object
});
</script>

<template>
  <div v-if="props.articles?.length !== 0" class="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-6 @4xl:gap-12 mt-10">
    <article v-for="article in props.articles" :key="article.id">
      <RouterLink class="grid" :to="`/works/${article.slug}`">
        <h3 class="order-2 font-medium mt-3">{{ article.title }}</h3>
        <figure class="order-1">
          <img class="w-full aspect-[4/3] object-cover" :src="`${article.thumbnail.url}`" :width="4" :height="3" alt="" loading="lazy" />
        </figure>
        <p class="mt-0.5 order-3 text-[13px]/[1.6] text-gray-500">{{ article.basicSkill.join(",").replace(/,/g, ", ") }}</p>
      </RouterLink>
    </article>
  </div>
  <div v-else class="mt-10">
    <p>データがありません。</p>
  </div>
</template>
