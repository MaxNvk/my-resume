<script setup lang="ts">
import WorkExperience from "@/components/WorkExperience.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import ContentBlock from "@/components/ContentBlock.vue";
import ExamplesOfWork from "@/components/ExamplesOfWork.vue";
</script>

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

<style scoped lang="scss">
.wrapper {
  @screen md {
    max-width: 50vw;
  }
}
</style>
