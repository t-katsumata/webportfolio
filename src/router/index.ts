import { createRouter, createWebHistory, type RouteRecordRaw, type RouterScrollBehavior } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Skills from "../pages/Skills.vue";
import Works from "../pages/Works.vue";
import WorksDetail from "../pages/WorksDetail.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/skills", component: Skills },
  { path: "/works", component: Works },
  { path: "/works/:slug", component: WorksDetail },
];

const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  // ブラウザの戻る/進む時は保存位置へ
  if (savedPosition) {
    return savedPosition;
  }
  // ハッシュがある場合はその要素へ
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: to.hash,
          behavior: "smooth", // スムーズスクロール
        });
      }, 200);
    });
  }
  // それ以外はページトップへ
  return { top: 0 };
};

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

export default router;
