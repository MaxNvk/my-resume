<template>
  <main
    class="min-h-screen bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-gray-800 px-4 py-10 sm:px-12 sm:py-16"
  >
    <div class="wrapper flex-grow w-full">
      <content-block />
      <work-experience />
      <examples-of-work />
    </div>

    <theme-switcher />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentBlock from "@/components/ContentBlock.vue";
import WorkExperience from "@/components/WorkExperience.vue";
import ExamplesOfWork from "@/components/ExamplesOfWork.vue";
import { useHead } from "@vueuse/head";
import { setInitialTheme } from "@/utils/set-initial-theme";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import WebCam from "@/experiments/camera-masking/WebCam.vue";

export default defineComponent({
  components: {
    WebCam,
    ThemeSwitcher,
    ContentBlock,
    WorkExperience,
    ExamplesOfWork,
  },
  setup() {
    useHead({
      title: "Maksym Novikov's website",
      meta: [
        {
          name: "description",
          content: "You can view more info about me on this website.",
        },
        {
          property: "og:url",
          content: "https://maxnvk.github.io/",
        },
        {
          property: "og:title",
          content: "Maksym Novikov's website",
        },
        {
          property: "og:description",
          content: "You can view more info about me on this website.",
        },
        {
          property: "og:image",
          content: "/og-image.png",
        },
      ],
    });
  },
  beforeMount() {
    setInitialTheme();
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 31rem;
}
</style>
