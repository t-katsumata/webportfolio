<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isVisible = ref<boolean>(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <transition name="slide-fadeUp">
    <div v-if="isVisible">
      <slot />
    </div>
  </transition>
</template>