<script setup lang="ts">
import { useHead } from "@unhead/vue";
import Logo from "../components/Logo.vue";
import H2Heading from "../ui/H2-heading.vue";
import ButtonDefault from "../ui/Button-default.vue";
import Loading from "../components/Loading.vue";
import CommonSection from "../components/CommonSection.vue";
import Skills from "../components/Skills.vue";
import PickupWorks from "../components/Works/PickupWorks.vue";
import { nextTick, onMounted, ref, watch } from "vue";
import PageFadeUp from "../components/pageFadeUp.vue";
import ScrollLine from "../ui/scrollLine.vue";

useHead({
  title: "TOORU KATSUMATA Web Portfolio",
  meta: [{ name: "description", content: "TOORU KATSUMATAのポートフォリオサイトです" }],
});

const showContent = ref<boolean>(false);
const isFirstVisit = ref<boolean>(false);

onMounted(() => {
  const hasVisited: string | null = sessionStorage.getItem("visited");

  if (!hasVisited) {
    isFirstVisit.value = true;
    setTimeout(() => {
      showContent.value = true;
    }, 2000);
  } else {
    showContent.value = true;
  }
});

watch(showContent, async (newVal) => {
  if (newVal) {
    await nextTick();

    const targetElements = document.querySelectorAll<HTMLElement>(".fadeTarget");

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("isActive");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    targetElements.forEach((target) => observer.observe(target));
  }
});
</script>

<template>
  <div>
    <!-- ローディング画面 -->
    <Loading />

    <!-- 本文 -->
    <PageFadeUp v-if="showContent">
      <div class="flex md:gap-[2%] items-center justify-center h-dvh relative md:px-6 @container">
        <h1 class="md:w-3/6 max-md:w-auto max-md:absolute max-md:inset-auto max-md:drop-shadow-[0_0_3px_rgb(0_0_0_/_0.8)] @max-md:px-[6.4%]">
          <Logo class="text-[56px] md:text-accent text-white" />
        </h1>
        <div class="md:w-3/6 w-full h-full bg-[url(../assets/images/index-mainVisual.jpg)] bg-cover bg-no-repeat bg-left"></div>
        <ScrollLine class="absolute bottom-2.5 md:left-6 left-[50%] max-md:translate-x-[-50%]" />
      </div>

      <CommonSection aria-labelledby="concept">
        <h2 id="concept" class="fadeTarget fadeUp text-[28px] md:text-3xl leading-[1.4] font-medium text-accent">ユーザにやさしく<br />　エンジニアにもやさしく</h2>
        <div class="flex flex-col-reverse md:flex-row md:gap-14 gap-8 items-center md:mt-8 mt-10">
          <div class="fadeTarget fadeLeft">
            <p>
              私はフロントエンドエンジニアとして、常に「人に寄り添うものづくり」を心がけています。サイトを訪れた誰もが迷わず目的の情報にたどり着けるよう、アクセシビリティを意識した設計を大切にしています。同時に、クライアントの想いやメッセージがきちんと伝わるよう、UIやアニメーションを通じて温度感のある表現を追求しています。単なる機能ではなく「気持ちが届く体験」を届けたいと考えています。
            </p>
            <p class="mt-[1em]">そして、共に開発する仲間にとっても扱いやすいコードを書くことを信条としています。シンプルで堅牢な設計を心がけ、誰が見ても理解しやすく、安心して手を加えられるコードを残すことで、チーム全体が気持ちよく前に進める環境をつくります。</p>
            <p class="mt-[1em]">「ユーザにやさしく、エンジニアにもやさしく」──その両方を大切にする姿勢が、私のエンジニアとしての原点です。<br />これからも、人に寄り添う開発を続けていきたいです。</p>
          </div>
          <figure class="fadeTarget fadeRight shrink-0">
            <img src="../assets/images/index-hero.png" width="256" height="256" alt="" role="presentation" />
          </figure>
        </div>
      </CommonSection>

      <CommonSection aria-labelledby="about-heading">
        <H2Heading id="about-heading" title="About" subtitle="自己紹介" />
        <section class="flex flex-col-reverse md:flex-row-reverse gap-16 items-center mt-10">
          <div class="fadeTarget fadeRight">
            <h3 class="text-3xl font-semibold"><span class="block text-[0.5em]">TOORU KATSUMATA</span>勝又　亨</h3>
            <p class="mt-10">
              静岡県生まれのフロントエンドエンジニア。専門学校ではCやC++といったプログラミング言語を学び、新卒から約8年間、光送受信機や自動車メーターなどのソフトウェア・ハードウェアのデバッグ業務に従事。学生時代から趣味として取り組んでいたWeb開発を仕事にしたいと考え、2017年にWeb制作会社へ転職。サイト更新業務からキャリアをスタートし、サイトリニューアルにおけるフルコーディング、食品関連サイトの運営・保守、WordPressや国産CMSを用いたサイト構築など、幅広い業務を経験してきました。
            </p>
            <ButtonDefault url="/about" text="More Profile" class="mt-12" />
          </div>
          <figure class="fadeTarget fadeLeft shrink-0">
            <img src="../assets/images/index-about.jpg" width="300" height="420" alt="勝又亨のプロフィール写真" loading="lazy" />
          </figure>
        </section>
      </CommonSection>

      <CommonSection aria-labelledby="skill">
        <H2Heading id="skill" title="Skills" subtitle="スキル一覧" />
        <div class="mt-10">
          <Skills
            :basicSkill="true"
            :subSkill="false"
            :tool="false"
            :qualification="false"
          />
          <ButtonDefault url="/skills" text="More Skills" class="fadeTarget fadeUp mt-12" />
        </div>
      </CommonSection>

      <CommonSection aria-labelledby="works" class="@container">
        <H2Heading id="works" title="Works" subtitle="成果物ギャラリー" />
        <PickupWorks />
        <ButtonDefault url="/works" text="View All Works" class="fadeTarget fadeUp mt-12" />
      </CommonSection>

      <CommonSection aria-labelledby="contact">
        <H2Heading id="contact" title="Contact" subtitle="お問い合わせ" />
        <p class="mt-10 fadeTarget fadeUp">お気軽にお問い合わせください。</p>
        <ul class="mt-8 fadeTarget fadeUp md:text-[20px]">
          <li>
            <a class="w-fit underline underline-offset-6 hover:text-sub transition-[color_0.3s] flex items-center gap-3 before:content-[''] before:bg-[url(../../images/skills/mail.svg)] before:bg-cover before:inline-block before:w-9 before:h-[34px] md:before:w-[42px] md:before:h-10 focus-visible:right-2" href="mailto:katsumata.tooru.ks@gmail.com">katsumata.tooru.ks@gmail.com</a></li>
          <li class="mt-6">
            <a class="w-fit underline underline-offset-6 hover:text-sub transition-[color_0.3s] flex items-center gap-3 before:content-[''] before:bg-[url(../../images/skills/github.svg)] before:bg-cover before:inline-block before:w-9 before:h-[34px] md:before:w-[42px] md:before:h-10 focus-visible:right-2" href="https://github.com/t-katsumata" target="_blank">https://github.com/t-katsumata</a>
          </li>
        </ul>
      </CommonSection>
    </PageFadeUp>
  </div>
</template>