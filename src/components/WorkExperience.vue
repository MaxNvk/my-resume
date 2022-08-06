<template>
  <section class="mt-12">
    <h2 class="text-2xl font-semibold">Work experience</h2>

    <ul class="mt-6 list-disc pl-4">
      <li v-for="(item, key) in experienceList" :key="key" class="mb-6">
        <p class="font-semibold mb-1">
          {{ item.title }}
        </p>
        <p class="mb-3">
          {{ item.description }}
        </p>
        <p><strong>Tech stack:</strong> {{ item.techStack }}</p>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { workExperiencesList } from "@/shared/config/work-experiences-list.config";

export default defineComponent({
  computed: {
    experienceList() {
      return workExperiencesList;
    },
  },
});
</script>

<style lang="scss" scoped></style>
