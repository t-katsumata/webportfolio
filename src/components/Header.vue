<script setup lang="ts">
</script>

<template>
  <div class="fixed top-0 left-0 w-full flex flex-col z-20 bg-bg">
    <header class="shadow">
      <nav class="mx-auto flex items-center justify-between py-2 px-[2.667%] md:px-6">
        <RouterLink class="leading-none" to="/">
          <span class="font-logo text-accent leading-none relative inline-block w-[22px] h-[38px]">
            <span class="text-2xl/[1] absolute top-0 left-0">O</span>
            <span class="text-2xl/[1] absolute bottom-0 right-0">O</span>
          </span>
        </RouterLink>
        <ul class="flex gap-6 text-accent">
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/skills">Skills</RouterLink></li>
          <li><RouterLink to="/works">Works</RouterLink></li>
          <li><RouterLink to="/#contact">Contact</RouterLink></li>
        </ul>
      </nav>
    </header>
  </div>
</template>
