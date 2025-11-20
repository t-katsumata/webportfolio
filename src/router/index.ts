// type RouteRecordRaw, type RouterScrollBehavior → 型だけをインポートする
// 通常の import と違い、type を付けることで「型情報のみ」を取り込む
import { createRouter, createWebHistory, type RouteRecordRaw, type RouterScrollBehavior } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Skills from "../pages/Skills.vue";
import Works from "../pages/Works.vue";
import WorksDetail from "../pages/WorksDetail.vue";

// routes が RouteRecordRaw 型の配列であることを明示
// RouteRecordRaw は Vue Router が提供する「ルート定義の型」で、
// path や component の必須項目を型チェックしてくれる
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/skills", component: Skills },
  { path: "/works", component: Works },
  { path: "/works/:slug", component: WorksDetail },
];

// scrollBehavior 関数：Vue Router のスクロール挙動を定義する関数型であることを指定
// RouterScrollBehavior 型は (to, from, savedPosition) => PositionResult のような
// 関数シグネチャを持っている
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
