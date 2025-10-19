<script setup lang="ts">
import { useHead } from '@unhead/vue';
import H1Heading from '../ui/H1-heading.vue';

useHead({
  title: "Works | TOORU KATSUMATA Web Portfolio",
  meta: [{ name: "description", content: "これまでの業務や趣味で開発したサイトの成果物を掲載しております。" }],
});
</script>

<template>
  <H1Heading title="Works" subtitle="成果物ギャラリー" />
</template>