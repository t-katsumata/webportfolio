<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="text-(--color-default) tracking-wide bg-bg flex flex-col min-h-screen">
    <Header />

    <main class="max-w-6xl mx-auto w-full flex-1">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
