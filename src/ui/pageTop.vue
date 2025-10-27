<script setup lang="ts">
const pageTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
</script>

<template>
  <button aria-label="ページの先頭へ移動" @click="pageTop" class="pageTopBtn">
    <p>
      <span aria-hidden="true">PageTop</span>
    </p>
  </button>
</template>

<style scoped>
.pageTopBtn {
  position: absolute;
  top: -80px;
  right: 16px;
  cursor: pointer;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 52px;
    height: 52px;
    background-color: var(--color-sub);
    border: solid 1px var(--color-sub);
    border-radius: 50vh;
    transition: 0.3s;
    &::after {
      content: '';
      width: 12px;
      height: 12px;
      border-top: solid 3px #fff;
      border-left: solid 3px #fff;
      transform: translateY(2px) rotate(45deg);
      transition: 0.3s;
    }
  }
  span {
    width: 0;
    font-size: 0;
  }
}
@media (width >= 768px) {
  .pageTopBtn {
    p {
      width: 64px;
      height: 64px;
      &::after {
        width: 16px;
        height: 16px;
      }
    }
  }
}
@media (any-hover: hover) {
  .pageTopBtn {
    p:hover {
      border-color: var(--color-neutral-500);
      background-color: #fff;
      &::after {
        border-top-color: var(--color-default);
        border-left-color: var(--color-default);
        transform: translateY(-3px) rotate(45deg);
      }
    }
  }
}
</style>