<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPrivatesWorks } from "../../api/articles";
import type { Work } from "../../types";
import WorksList from "./WorksList.vue";

const articles = ref<Work[]>([]);

onMounted(async (): Promise<void> => {
  const data = await getPrivatesWorks();
  if (data) {
    articles.value = data.contents;
  }
});
</script>

<template>
  <WorksList :articles="articles" />
</template>
