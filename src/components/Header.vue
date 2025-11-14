<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const router = useRouter();
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const firstMenuItemRef = ref<HTMLAnchorElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);

const toggleMenu = async (): Promise<void> => {
  isOpen.value = !isOpen.value;

  await nextTick();

  if (isOpen.value && firstMenuItemRef.value) {
    firstMenuItemRef.value.focus();
  } else if (!isOpen.value && menuButtonRef.value) {
    menuButtonRef.value.focus();
  }
}

const closeMenu = async (): Promise<void> => {
  isOpen.value = false;
  await nextTick();
  if (menuButtonRef.value) {
    menuButtonRef.value.focus();
  }
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

const handleKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu();
  }

  if (e.key === 'Tab' && isOpen.value && menuRef.value) {
    const focusable = menuRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
}

const handleClickOutside = (e: MouseEvent): void => {
  const menuEl = menuRef.value;
  const buttonEl = menuButtonRef.value;
  if (!menuEl || !isOpen.value) return;

  const target = e.target as HTMLElement;
  if (!menuEl.contains(target) && !buttonEl?.contains(target)) {
    closeMenu();
  }
}

const handleTransitionEnd = (e: TransitionEvent): void => {
  if (e.propertyName === 'right') {
    console.log('Menu transition finished');
  }
}

onMounted(() => {
  router.afterEach(() => {
    closeMenu();
  });

  document.addEventListener('click', handleClickOutside);
  window.addEventListener('keydown', handleKeydown);

  if (menuRef.value) {
    menuRef.value.addEventListener('transitionend', handleTransitionEnd);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('keydown', handleKeydown);

  if (menuRef.value) {
    menuRef.value.removeEventListener('transitionend', handleTransitionEnd);
  }
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
          ref="menuButtonRef"
          @click="toggleMenu"
          :aria-expanded="isOpen"
          aria-controls="main-menu"
          class="max-md:fixed max-md:top-[13px] max-md:right-[2.667%] max-md:w-[30px] max-md:cursor-pointer max-md:z-20"
        >
          <span
            class="max-md:block max-md:w-full max-md:bg-accent max-md:my-[5px] transition-[0.4s] max-md:h-[3px]"
            :class="isOpen ? 'max-md:rotate-45 max-md:translate-x-[0] max-md:translate-y-[8px]' : ''"
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
          ref="menuRef"
          id="main-menu"
          class="flex md:gap-x-6 text-accent max-md:flex-col max-md:absolute max-md:top-[55px] max-md:w-[300px] max-md:bg-bg max-md:text-center max-md:gap-y-3 max-md:p-[24px_24px_40px] max-md:shadow-[0_4px_4px_rgb(0_0_0/0.3)] transition-all duration-400"
          :class="isOpen ? 'max-md:right-0' : 'max-md:right-[-100%]'"
        >
          <li class="max-md:border-b max-md:border-gray-300 max-md:pb-3">
            <RouterLink class="relative md:before:transition-[width_0.3s_ease-in-out] md:before:content-[''] md:before:absolute md:before:bottom-[-2px] md:before:left-0 md:before:inline-block md:before:w-0 md:before:h-0.5 md:before:bg-accent md:hover:before:w-full" to="/about" custom v-slot="{ navigate, href, isActive }">
              <a
                :href="href"
                @click="navigate; closeMenu()"
                ref="firstMenuItemRef"
                :class="{ 'text-accent': isActive }"
              >
                About
              </a>
            </RouterLink>
          </li>
          <li class="max-md:border-b max-md:border-gray-300 max-md:pb-3">
            <RouterLink class="relative md:before:transition-[width_0.3s_ease-in-out] md:before:content-[''] md:before:absolute md:before:bottom-[-2px] md:before:left-0 md:before:inline-block md:before:w-0 md:before:h-0.5 md:before:bg-accent md:hover:before:w-full" to="/skills" @click="closeMenu">Skills</RouterLink>
          </li>
          <li class="max-md:border-b max-md:border-gray-300 max-md:pb-3">
            <RouterLink class="relative md:before:transition-[width_0.3s_ease-in-out] md:before:content-[''] md:before:absolute md:before:bottom-[-2px] md:before:left-0 md:before:inline-block md:before:w-0 md:before:h-0.5 md:before:bg-accent md:hover:before:w-full" to="/works" @click="closeMenu">Works</RouterLink>
          </li>
          <li>
            <RouterLink class="relative md:before:transition-[width_0.3s_ease-in-out] md:before:content-[''] md:before:absolute md:before:bottom-[-2px] md:before:left-0 md:before:inline-block md:before:w-0 md:before:h-0.5 md:before:bg-accent md:hover:before:w-full" to="/#contact" @click="closeMenu">Contact</RouterLink>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
