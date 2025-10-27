<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <section class="mt-20 px-[2.667%] md:px-6" v-bind="$attrs">
    <slot />
  </section>
</template>