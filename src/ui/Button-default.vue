<script setup lang="ts">
  const props = defineProps({
    url: String,
    text: String
  });
</script>

<template>
  <div class="text-center">
    <RouterLink
      :to="`${ props.url }`"
      class="group relative inline-flex items-center justify-center overflow-hidden border border-neutral-200 font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-sub"
      :aria-label="props.text"
    >
      <div class="inline-flex translate-x-0 items-center justify-center bg-sub text-white transition group-hover:-translate-x-[150%] px-6 py-3 min-w-60 max-w-80">{{ props.text }}</div>
      <div aria-hidden="true" class="absolute inline-flex w-full translate-x-[100%] items-center justify-center bg-white px-6 py-3 min-w-60 max-w-80 transition duration-300 group-hover:translate-x-0">{{ props.text }}</div>
    </RouterLink>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .group > div {
    transition: none !important;
    transform: none !important;
  }
}
</style>