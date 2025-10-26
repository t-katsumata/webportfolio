<script setup lang="ts">
  const props = defineProps({
    title: String,
    subtitle: String
  });

  const safeId = `subtitle-${props.title?.toLowerCase().replace(/\s+/g, '-')}`;
</script>

<template>
  <h2
    aria-level="2"
    class="fadeTarget fadeUp font-heading text-accent text-5xl/[1]"
    :aria-describedby="safeId"
    v-intersect
  >
      {{ props.title }}
    <span
    :id="safeId"
      class="font-default font-bold text-[0.35em] ml-4"
    >
      {{ props.subtitle }}
    </span>
  </h2>
</template>