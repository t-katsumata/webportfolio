<script setup lang="ts">
import { useHead } from "@unhead/vue";
import H1Heading from "../ui/H1-heading.vue";
import Skills from "../components/Skills.vue";
import PageFadeUp from "../components/pageFadeUp.vue";

useHead({
  title: "Skills | TOORU KATSUMATA Web Portfolio",
  meta: [{ name: "description", content: "業務に活かせる技術、経験を紹介するページです。" }],
});
</script>

<template>
  <PageFadeUp>
    <H1Heading title="Skills" subtitle="スキル一覧" />

    <div class="px-[2.667%] md:px-6 mt-20">
      <Skills
        :basicSkill="true"
        :subSkill="true"
        :tool="true"
        :qualification="true"
      />
    </div>
  </PageFadeUp>
</template>
