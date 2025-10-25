<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, type Router } from 'vue-router';

const isOpen = ref(false);
const toggleMenu = (): void => {
  isOpen.value = !isOpen.value;
}
const closeMenu = (): void => {
  isOpen.value = false;
}

const router: Router = useRouter();

onMounted(() => {
  router.afterEach(() => {
    closeMenu();
  });
});

</script>

<template>
  <div class="fixed top-0 left-0 w-full flex flex-col z-20 bg-bg">
    <header class="shadow">
      <nav
        role="navigation"
        aria-label="メインメニュー"
        class="mx-auto flex items-center justify-between py-2 px-[2.667%] md:px-6 max-md:relative">
        <RouterLink class="leading-none" to="/">
          <span class="font-logo text-accent leading-none relative inline-block w-[22px] h-[38px]">
            <span class="text-2xl/[1] absolute top-0 left-0">O</span>
            <span class="text-2xl/[1] absolute bottom-0 right-0">O</span>
          </span>
        </RouterLink>
        <button
          @click="toggleMenu"
          :aria-expanded="isOpen"
          aria-controls="main-menu"
          class="max-md:fixed max-md:top-[13px] max-md:right-5 max-md:w-[30px] max-md:cursor-pointer max-md:z-20"
        >
          <span
            class="max-md:block max-md:w-full max-md:bg-accent max-md:my-[5px] transition-[0.4s] max-md:h-[3px]"
            :class="isOpen ? 'max-md:rotate-45 max-md:translate-x-[0] max-md:translate-y-[7px]' : ''"
          ></span>
          <span
            class="max-md:block max-md:w-full max-md:bg-accent max-md:my-[5px] transition-[0.4s] max-md:h-[3px]"
            :class="isOpen ? 'max-md:opacity-0' : ''"
          ></span>
          <span
            class="max-md:block max-md:w-full max-md:bg-accent max-md:my-[5px] transition-[0.4s] max-md:h-[3px]"
            :class="isOpen ? 'max-md:rotate-[-45deg] max-md:translate-x-[0] max-md:translate-y-[-8px]' : ''"
          ></span>
        </button>
        <ul
          id="main-menu"
          :aria-hidden="!isOpen"
          class="flex md:gap-x-6 text-accent max-md:flex-col max-md:absolute max-md:top-[55px] max-md:w-[300px] max-md:bg-bg max-md:text-center max-md:gap-y-6 max-md:p-[24px_24px_40px] transition-all duration-400"
          :class="isOpen ? 'max-md:right-0' : 'max-md:right-[-100%]'"
        >
          <li><RouterLink to="/about" @click="closeMenu">About</RouterLink></li>
          <li><RouterLink to="/skills" @click="closeMenu">Skills</RouterLink></li>
          <li><RouterLink to="/works" @click="closeMenu">Works</RouterLink></li>
          <li><RouterLink to="/#contact" @click="closeMenu">Contact</RouterLink></li>
        </ul>
      </nav>
    </header>
  </div>
</template>
