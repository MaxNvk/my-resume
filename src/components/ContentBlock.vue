<template>
  <section>
    <h1 class="text-5xl font-semibold flex">
      Hello.
      <canvas-animation class="ml-1 mt-1" />
    </h1>

    <div class="content-block__wrapper mt-12">
      <p class="mb-3">
        My name is
        <strong>Maksym Novikov.</strong> I am a Frontend Engineer with
        <b
          ><span class="whitespace-nowrap">{{ startWorkingDate }}+</span> years
          of experience</b
        >
        building high-performance, scalable web applications. Skilled in
        <b
          >Vue.js, React.js, TypeScript, JavaScript (ES6+), and UI/UX best
          practices</b
        >. Passionate about delivering optimized, accessible, and visually
        appealing user experiences. Proven track record of developing
        applications for top brands like <b>Pepsi, Toyota, and Carmax</b>.
        Strong collaborator with expertise in
        <b>performance optimization, security, and API integrations</b>.
      </p>
    </div>

    <contacts-block class="mt-4" />
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { WORKING_START_DATE } from "@/shared/constants";
import CanvasAnimation from "@/components/CanvasAnimation.vue";
import ContactsBlock from "@/components/ContactsBlock.vue";

dayjs.extend(relativeTime);

const startWorkingDate = computed((): string => {
  return dayjs(WORKING_START_DATE).fromNow(true);
});
</script>
