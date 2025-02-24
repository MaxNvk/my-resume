<template>
  <section class="mt-12">
    <h2 class="text-2xl font-semibold">Work experience</h2>

    <ul class="mt-6 pl-4">
      <li v-for="(item, key) in experienceList" :key="key" class="mb-6">
        <p class="mb-1 text-lg">
          <i class="mr-2">{{ item.dates }}</i>

          <b class="font-semibold">{{ item.title }}</b>
        </p>

        <ul class="mb-4 list-disc pl-4">
          <li
            v-for="(subItem, key) in item.description"
            :key="key"
            class="pl-1 mb-1"
          >
            {{ subItem }}
          </li>
        </ul>
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
