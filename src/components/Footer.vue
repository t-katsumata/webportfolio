<script setup lang="ts">
import PageTop from '../ui/pageTop.vue';
import Logo from './Logo.vue';

</script>

<template>
  <footer class="relative bg-main text-center py-[32px_16px] text-sm text-white mt-32">
    <PageTop />
    <div class="flex justify-between max-md:flex-col max-md:gap-y-8 items-center px-[2.667%] md:px-6 max-w-7xl mx-auto">
      <RouterLink to="/">
        <Logo class="text-[32px] md:text-4xl text-left" />
      </RouterLink>
      <ul class="flex gap-7 text-white">
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/skills">Skills</RouterLink></li>
        <li><RouterLink to="/works">Works</RouterLink></li>
        <li><RouterLink to="/#contact">Contact</RouterLink></li>
      </ul>
    </div>
    <small class="block mt-8">&copy; 2025 TOORU KATSUMATA. All Rights Reserved.</small>
  </footer>
</template>