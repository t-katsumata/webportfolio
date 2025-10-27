<script setup lang="ts">
import { onMounted, ref } from "vue";
import Logo from "./Logo.vue";

// =======================
// 状態管理
// =======================
const isLoading = ref<boolean>(true);
const isFirstVisit = ref<boolean>(true);

const loadingOff = (): void => {
  isLoading.value = false;
  // document.body.style.overflow = "auto";
};

onMounted(async (): Promise<void> => {
  const hasVisited: string | null = sessionStorage.getItem("visited");

  if (hasVisited) {
    // 2回目以降 → ローディング画面をスキップ
    isLoading.value = false;
    isFirstVisit.value = false;
  } else {
    // 初回アクセス → ローディング画面を表示
    isFirstVisit.value = true;
    document.body.style.overflowX = "hidden";
    setTimeout(() => {
      loadingOff();
      sessionStorage.setItem("visited", "true");
    }, 2000);
  }
});
</script>

<template>
  <transition v-if="isFirstVisit" name="fade">
    <div
      v-if="isLoading"
      class="loading-screen fixed inset-0 flex justify-center items-center bg-bg z-50 @container"
      role="status"
      aria-live="assertive"
      aria-label="読み込み中です"
    >
      <h1 class="@max-md:px-[6.4%]">
        <Logo role="presentation" aria-hidden="true" class="text-[56px] md:text-[72px] text-accent" />
      </h1>
    </div>
  </transition>
</template>
