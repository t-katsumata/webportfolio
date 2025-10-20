<script setup lang="ts">
import { useHead } from '@unhead/vue';
import H1Heading from '../ui/H1-heading.vue';
import H2Heading from '../ui/H2-heading.vue';
import CommonSection from '../components/CommonSection.vue';
import AffairsWorks from '../components/Works/AffairsWorks.vue';
import PrivatesWorks from '../components/Works/PrivatesWorks.vue';
import PageFadeUp from '../components/pageFadeUp.vue';

useHead({
  title: "Works | TOORU KATSUMATA Web Portfolio",
  meta: [{ name: "description", content: "これまでの業務や趣味で開発したサイトの成果物を掲載しております。" }],
});
</script>

<template>
  <PageFadeUp>
    <H1Heading title="Works" subtitle="成果物ギャラリー" />
    <CommonSection class="@container">
      <H2Heading title="Affairs" subtitle="業務開発" />
      <AffairsWorks />
    </CommonSection>

    <CommonSection class="@container">
      <H2Heading title="Privates" subtitle="個人開発" />
      <PrivatesWorks />
    </CommonSection>
  </PageFadeUp>
</template>