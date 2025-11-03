<script setup lang="ts">
import { useHead } from "@unhead/vue";
import H2Heading from "../ui/H2-heading.vue";
import H1Heading from "../ui/H1-heading.vue";
import CommonSection from "../components/CommonSection.vue";
import type { Biography } from "../types";
import biographyItem from "../data/biography.json";
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import PageFadeUp from "../components/pageFadeUp.vue";

const biography = ref<Biography[]>(biographyItem);

useHead({
  title: "About | TOORU KATSUMATA Web Portfolio",
  meta: [{ name: "description", content: "自己紹介ページです。" }],
});

const activeIndex = ref<number>(0);
const container = ref<HTMLElement | null>(null);

const onWheel = (e: WheelEvent) => {
  const el = container.value;
  if (!el) return;

  const style = window.getComputedStyle(el);
  const scrollX = style.overflowX;

  if (scrollX === "scroll") {
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }
};

onMounted(async () => {
  await nextTick(); // DOM描画完了を待つ

  const el = container.value;
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          activeIndex.value = index;
        }
      });
    },
    {
      root: el,
      threshold: 0.6,
    }
  );

  el?.querySelectorAll(".timeline-item").forEach((el, i) => {
    (el as HTMLElement).dataset.index = String(i);
    observer.observe(el);
  });

  el.addEventListener("wheel", onWheel, { passive: false });
});

onBeforeUnmount(() => {
  const el = container.value;
  if (el) {
    el.removeEventListener("wheel", onWheel);
  }
});
</script>

<template>
  <PageFadeUp>
    <H1Heading title="About" subtitle="自己紹介" />
    <div class="@container px-[2.667%] md:px-6 mt-20">
      <div class="flex @4xl:flex-row flex-col items-center @4xl:gap-[5.8%] gap-9">
        <figure class="shrink-0 fadeTarget fadeLeft" v-intersect>
          <img class="rounded-[8px]" src="../assets/images/index-about.jpg" width="300" height="420" alt="勝又亨のプロフィール写真" />
        </figure>
        <dl class="fadeTarget fadeRight" v-intersect>
          <div role="group" aria-labelledby="name-label" class="md:flex px-2 py-4 border-b border-gray-500">
            <dt id="name-label" class="shrink-0 w-28 font-medium">名前</dt>
            <dd class="max-md:mt-2 max-md:ml-[1em]">勝又　亨（カツマタ　トオル）</dd>
          </div>
          <div role="group" aria-labelledby="birthday-label" class="md:flex px-2 py-4 border-b border-gray-500">
            <dt id="birthday-label" class="shrink-0 w-28 font-medium">生年月日</dt>
            <dd class="max-md:mt-2 max-md:ml-[1em]">1985年11月1日</dd>
          </div>
          <div role="group" aria-labelledby="birthplace-label" class="md:flex px-2 py-4 border-b border-gray-500">
            <dt id="birthplace-label" class="shrink-0 w-28 font-medium">出身地</dt>
            <dd class="max-md:mt-2 max-md:ml-[1em]">静岡県富士宮市</dd>
          </div>
          <div role="group" aria-labelledby="currentLocation-label" class="md:flex px-2 py-4 border-b border-gray-500">
            <dt id="currentLocation-label" class="shrink-0 w-28 font-medium">現住所</dt>
            <dd class="max-md:mt-2 max-md:ml-[1em]">東京都中野区</dd>
          </div>
          <div role="group" aria-labelledby="educational-label" class="md:flex px-2 py-4 border-b border-gray-500">
            <dt id="educational-label" class="shrink-0 w-28 font-medium">最終学歴</dt>
            <dd class="max-md:mt-2 max-md:ml-[1em]">沼津情報専門学校 コンピュータ科 情報処理コース<br />（現：沼津情報・ビジネス専門学校 コンピュータ科）<br />※2004年4月入学 2006年3月卒業</dd>
          </div>
          <div role="group" aria-labelledby="career-label" class="md:flex px-2 py-4">
            <dt class="shrink-0 w-28 font-medium">経歴</dt>
            <dd id="career-label" class="max-md:mt-2 max-md:ml-[1em]">
              静岡県生まれのフロントエンドエンジニア。専門学校ではCやC++といったプログラミング言語を学び、新卒から約8年間、光送受信機や自動車メーターなどのソフトウェア・ハードウェアのデバッグ業務に従事。学生時代から趣味として取り組んでいたWeb開発を仕事にしたいと考え、2017年にWeb制作会社へ転職。サイト更新業務からキャリアをスタートし、サイトリニューアルにおけるフルコーディング、食品関連サイトの運営・保守、WordPressや国産CMSを用いたサイト構築など、幅広い業務を経験してきました。
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <CommonSection aria-labelledby="biography">
      <H2Heading id="biography" title="Biography" subtitle="略歴" />
      <p class="mt-10 fadeTarget fadeUp" v-intersect>※画像は全てイメージです。</p>
      <div
        aria-label="略歴タイムライン"
        class="timeline fadeTarget fadeUp"
        role="list"
        ref="container"
        tabindex="0"
        v-intersect
      >
        <dl class="timeline-wrapper">
          <div
            class="timeline-item"
            v-for="(item, index) in biography"
            :key="index"
            :class="{ active: activeIndex === index }"
            role="listitem"
            :aria-current="activeIndex === index ? 'step' : undefined"
            tabindex="0"
          >
            <dt class="timeline-date">{{ item.year }}</dt>
            <dd class="timeline-content">
              <figure class="timeline-image">
                <img class="aspect-[320/240] object-cover" :src="`${item.imageUrl}`" :alt="`${item.title}の写真`" width="320" height="240" />
              </figure>
              <div class="timeline-detail">
                <p class="timeline-title">{{ item.title }}</p>
                <p class="timeline-text">{{ item.text }}</p>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </CommonSection>

    <CommonSection aria-labelledby="interest" class="@container">
      <H2Heading id="interest" title="Interest" subtitle="好きなもの" />
      <p class="mt-10 fadeTarget fadeUp" v-intersect>仕事以外でも新しい発見やインスピレーションを大切にしています。</p>
      <ul class="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 mt-10 @lg:gap-[32px_3.623%] gap-8 fadeTarget fadeUp" v-intersect>
        <li class="grid place-content-start">
          <h3 class="font-medium order-2 mt-2">ウォーキング</h3>
          <figure class="order-1">
            <img src="../assets/images/about-walking.jpg" width="800" height="450" alt="ウォーキング中の風景" />
          </figure>
          <p class="mt-2 order-3">週に1回、首都圏を中心に20〜30kmほどのウォーキングをしています。都会の喧騒から離れ、川や湖などの自然に触れることで、心身ともにリフレッシュしています。</p>
        </li>
        <li class="grid place-content-start">
          <h3 class="font-medium order-2 mt-2">スポーツ観戦</h3>
          <figure class="order-1">
            <img src="../assets/images/about-sports.jpg" width="800" height="450" alt="スポーツ観戦の様子" />
          </figure>
          <p class="mt-2 order-3">子どもの頃からプロ野球、大相撲、Formula 1を観てきました。その他にもサッカー、箱根駅伝、格闘技などを「広く浅く」楽しんでいます。</p>
        </li>
        <li class="grid place-content-start">
          <h3 class="font-medium order-2 mt-2">音楽鑑賞</h3>
          <figure class="order-1">
            <img src="../assets/images/about-music.jpg" width="800" height="450" alt="たくさんの音楽CDに囲まれている風景" />
          </figure>
          <p class="mt-2 order-3">Spotifyでアジア、ヨーロッパ、アフリカなど世界各地の音楽を聴くのが好きです。テクノやドラムンベース（DnB）、チルアウトといった電子音楽もよく聴きます。</p>
        </li>
      </ul>
    </CommonSection>
  </PageFadeUp>
</template>
