<template>
  <section class="mt-12">
    <h2 class="text-2xl font-semibold">Examples of my work</h2>

    <ul class="mt-6 list-disc pl-4">
      <li v-for="link in examplesList" :key="link" class="mb-2">
        <a :href="link" target="_blank" class="text-red-400 border-b-2 border-dashed border-red-400">
          {{ link }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { workExamplesList } from "@/shared/config/work-examples-list.config";

export default defineComponent({
  computed: {
    examplesList() {
      return workExamplesList;
    },
  },
});
</script>

<style lang="scss" scoped></style>
