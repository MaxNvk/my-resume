<template>
  <main
    class="min-h-screen bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-gray-800 px-4 py-10 sm:px-12 sm:py-16"
  >
    <div class="wrapper flex-grow w-full">
      <content-block />
      <work-experience />
      <examples-of-work />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentBlock from "@/components/ContentBlock.vue";
import WorkExperience from "@/components/WorkExperience.vue";
import ExamplesOfWork from "@/components/ExamplesOfWork.vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
  components: { ContentBlock, WorkExperience, ExamplesOfWork },
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
});
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 31rem;
}
</style>
