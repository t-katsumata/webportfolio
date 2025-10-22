<script setup lang="ts">
import { useHead } from '@unhead/vue';
import H1Heading from '../ui/H1-heading.vue';
import CommonSection from '../components/CommonSection.vue';
import PageFadeUp from '../components/pageFadeUp.vue';
import AllWorks from '../components/Works/AllWorks.vue';

useHead({
  title: "Works | TOORU KATSUMATA Web Portfolio",
  meta: [{ name: "description", content: "これまでの業務や趣味で開発したサイトの成果物を掲載しております。" }],
});
</script>

<template>
  <PageFadeUp>
    <H1Heading title="Works" subtitle="成果物ギャラリー" />
    <CommonSection class="@container">
      <AllWorks />
    </CommonSection>
  </PageFadeUp>
</template>