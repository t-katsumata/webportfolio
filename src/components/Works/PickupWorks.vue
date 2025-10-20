<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPickupWorks } from "../../api/articles";
import type { Work } from "../../types";
import WorksList from "./WorksList.vue";

const articles = ref<Work[]>([]);

onMounted(async (): Promise<void> => {
  const data = await getPickupWorks();
  if (data) {
    articles.value = data.contents;
  }
});
</script>

<template>
  <WorksList :articles="articles" />
</template>
