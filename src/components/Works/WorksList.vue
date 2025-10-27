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
  return category === '業務実績' ? 'bg-[#00002F]' : 'bg-[#AD0065]';
}
</script>

<template>
  <div v-if="props.articles?.length !== 0" class="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-[32px_24px] @4xl:gap-12 mt-10">
    <article v-for="article in props.articles" :key="article.id" class="fadeTarget fadeUp" v-intersect>
      <RouterLink
        class="worksList grid"
        :to="`/works/${article.slug}`"
        :aria-label="`成果物「${article.title}」の詳細ページへ`"
      >
        <span
          class="order-2 mt-4 text-white text-sm inline-block w-fit p-[2px_16px_3px] rounded-sm"
          :class="getWorkCategoryClass(article.workCategory[0] ?? '')"
        >{{ article.workCategory[0] ?? '' }}</span>
        <h3 class="worksList-title order-3 font-medium mt-1">{{ article.title }}</h3>
        <div
          v-show="!isLoadedMap[article.id]"
          class="bg-gray-300 animate-pulse w-[336px] h-[252px] rounded-md absolute z-10"
          aria-hidden="true"
        ></div>
        <figure class="worksList-image order-1 relative">
          <img
            class="w-full aspect-[4/3] object-cover"
            :src="`${article.thumbnail.url}`"
            :width="336"
            :height="252"
            alt="`成果物「${article.title}」のサムネイル画像`"
            loading="eager"
            @load="isLoadedMap[article.id] = true"
          />
        </figure>
        <ul aria-label="使用スキル" class="flex flex-wrap worksList-skill mt-0.5 order-4 text-[13px]/[1.6] text-gray-600">
          <li
            v-for="skill in article.basicSkill"
            :key="skill"
            class="after:content-[','] last:after:content-[''] mr-1"
          >
            {{ skill }}
          </li>
        </ul>
      </RouterLink>
    </article>
  </div>
  <div v-else class="mt-10 fadeTarget fadeUp">
    <p>データがありません。</p>
  </div>
</template>