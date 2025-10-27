<script setup lang="ts">
  const props = defineProps({
    title: String,
    subtitle: String
  });
</script>

<template>
  <header class="flex flex-wrap items-baseline pt-[135px] px-[2.667%] md:px-6 text-accent leading-none text-[64px] md:text-7xl gap-[4px_16px]">
    <h1 class="font-heading">
      {{ props.title }}
    </h1>
    <p aria-hidden="false" class="font-default font-bold text-[0.35em]">
      {{ props.subtitle }}
    </p>
  </header>
</template>