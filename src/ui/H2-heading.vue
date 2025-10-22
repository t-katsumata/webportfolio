<script setup lang="ts">
  const props = defineProps({
    title: String,
    subtitle: String
  });
</script>

<template>
  <h2 class="fadeTarget fadeUp font-heading text-accent text-5xl/[1]" v-intersect>
    {{ props.title }}<span class="font-default font-medium text-[0.35em] ml-4">{{ props.subtitle }}</span>
  </h2>
</template>