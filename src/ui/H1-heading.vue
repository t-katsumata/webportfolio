<script setup lang="ts">
  const props = defineProps({
    title: String,
    subtitle: String
  });
</script>

<template>
  <h1 class="flex flex-wrap items-baseline gap-[4px_16px] font-heading text-accent text-7xl/[1] pt-[135px] px-[2.667%] md:px-6">
    {{ props.title }}<span class="font-default font-bold text-[0.35em]">{{ props.subtitle }}</span>
  </h1>
</template>