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

export default defineComponent({
  components: { ContentBlock, WorkExperience, ExamplesOfWork },
});
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 31rem;
}
</style>
