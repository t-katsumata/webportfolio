<script setup lang="ts">
import { useHead } from "@unhead/vue";
import Logo from "../components/Logo.vue";
import H2Heading from "../ui/H2-heading.vue";
import ButtonDefault from "../ui/Button-default.vue";
import { onMounted, ref } from "vue";
import { getPickupWorks } from "../api/articles";
import type { Work, WorkListResponse } from "../types";
import Loading from "../components/Loading.vue";
import CommonSection from "../components/CommonSection.vue";
import Skills from "../components/Skills.vue";

const articles = ref<Work[]>([]);

useHead({
  title: "TOORU KATSUMATA Web Portfolio",
  meta: [{ name: "description", content: "TOORU KATSUMATAのポートフォリオサイトです" }],
});

onMounted(async (): Promise<void> => {
  const data: WorkListResponse = await getPickupWorks();
  articles.value = data.contents;
});
</script>

<template>
  <div>
    <!-- ローディング画面 -->
    <Loading />

    <!-- 本文 -->
    <div class="flex md:gap-[2%] items-center justify-center h-dvh relative md:px-6">
      <h1 class="md:w-3/6 max-md:w-auto max-md:absolute max-md:inset-auto max-md:drop-shadow-[0_0_3px_rgb(0_0_0_/_0.8)]">
        <Logo class="text-[56px]" />
      </h1>
      <div class="md:w-3/6 w-full h-full bg-[url(../assets/images/index-mainVisual.jpg)] bg-cover bg-no-repeat bg-left"></div>
    </div>

    <CommonSection>
      <h2 class="text-3xl/[1.4] font-medium text-accent">ユーザにやさしく<br />　エンジニアにもやさしく</h2>
      <div class="flex flex-col-reverse md:flex-row md:gap-14 gap-6 max-md:items-center">
        <div>
          <p class="mt-6">
            私はフロントエンドエンジニアとして、常に「人に寄り添うものづくり」を心がけています。サイトを訪れた誰もが迷わず目的の情報にたどり着けるよう、アクセシビリティを意識した設計を大切にしています。同時に、クライアントの想いやメッセージがきちんと伝わるよう、UIやアニメーションを通じて温度感のある表現を追求しています。単なる機能ではなく「気持ちが届く体験」を届けたいと考えています。
          </p>
          <p class="mt-4">そして、共に開発する仲間にとっても扱いやすいコードを書くことを信条としています。シンプルで堅牢な設計を心がけ、誰が見ても理解しやすく、安心して手を加えられるコードを残すことで、チーム全体が気持ちよく前に進める環境をつくります。</p>
          <p class="mt-4">「ユーザにやさしく、エンジニアにもやさしく」──その両方を大切にする姿勢が、私のエンジニアとしての原点です。<br />これからも、人に寄り添う開発を続けていきたいです。</p>
        </div>
        <figure class="shrink-0 mt-14">
          <img src="../assets/images/index-hero.png" width="256" height="256" alt="" />
        </figure>
      </div>
    </CommonSection>

    <CommonSection>
      <H2Heading title="About" subtitle="自己紹介" />
      <section class="flex flex-col-reverse md:flex-row-reverse gap-16 items-center mt-8">
        <div>
          <h3 class="text-3xl font-semibold"><span class="block text-[0.5em]">TOORU KATSUMATA</span>勝又　亨</h3>
          <p class="mt-10">
            静岡県生まれのフロントエンドエンジニア。専門学校ではCやC++といったプログラミング言語を学び、新卒から約8年間、光送受信機や自動車メーターなどのソフトウェア・ハードウェアのデバッグ業務に従事。学生時代から趣味として取り組んでいたWeb開発を仕事にしたいと考え、2017年にWeb制作会社へ転職。サイト更新業務からキャリアをスタートし、サイトリニューアルにおけるフルコーディング、食品関連サイトの運営・保守、WordPressや国産CMSを用いたサイト構築など、幅広い業務を経験してきました。
          </p>
          <ButtonDefault url="/about" text="More Profile" class="mt-12" />
        </div>
        <figure class="shrink-0">
          <img src="../assets/images/index-about.jpg" width="300" height="420" alt="プロフィール写真" loading="lazy" />
        </figure>
      </section>
    </CommonSection>

    <CommonSection>
      <H2Heading title="Skills" subtitle="スキル一覧" />
      <div class="mt-8">
        <Skills
          :basicSkill="true"
          :subSkill="false"
          :tool="false"
          :qualification="false"
        />
        <ButtonDefault url="/skills" text="More Skills" class="mt-12" />
      </div>
    </CommonSection>

    <CommonSection class="@container">
      <H2Heading title="Works" subtitle="成果物ギャラリー" />
      <div class="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-6 @4xl:gap-12 mt-8">
        <article v-for="article in articles" :key="article.id">
          <RouterLink class="grid" :to="`/works/${article.slug}`">
            <h3 class="order-2 font-medium mt-3">{{ article.title }}</h3>
            <figure class="order-1">
              <img class="aspect-[4/3] object-cover" :src="`${article.thumbnail.url}`" :width="`${article.thumbnail.width}`" :height="`${article.thumbnail.height}`" alt="" loading="lazy" />
            </figure>
            <p class="mt-0.5 order-3 text-[13px]/[1.6] text-gray-500">{{ article.basicSkill.join(',').replace(/,/g, ', ') }}</p>
          </RouterLink>
        </article>
      </div>
      <ButtonDefault url="/works" text="View All Works" class="mt-12" />
    </CommonSection>

    <CommonSection>
      <H2Heading id="contact" title="Contact" subtitle="お問い合わせ" />
      <p class="mt-8">お気軽にお問い合わせください。</p>
      <ul class="mt-8">
        <li class="text-[20px]">
          <a class="w-fit underline underline-offset-6 hover:text-sub transition-[color_0.3s] flex items-center gap-3 before:content-[''] before:bg-[url(../../images/skills/mail.svg)] before:bg-cover before:inline-block before:w-[42px] before:h-10" href="mailto:katsumata.tooru.ks@gmail.com">katsumata.tooru.ks@gmail.com</a></li>
        <li class="text-[20px] mt-6">
          <a class="w-fit underline underline-offset-6 hover:text-sub transition-[color_0.3s] flex items-center gap-3 before:content-[''] before:bg-[url(../../images/skills/github.svg)] before:bg-cover before:inline-block before:w-[42px] before:h-10" href="https://github.com/t-katsumata" target="_blank">https://github.com/t-katsumata</a>
        </li>
      </ul>
    </CommonSection>
  </div>
</template>
