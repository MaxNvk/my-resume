<template>
  <section>
    <h1 class="text-5xl font-semibold flex">
      Hello.
      <canvas-animation class="ml-1 mt-1 sm:mt-2.5" />
    </h1>

    <div class="content-block__wrapper mt-12">
      <p class="mb-3">
        My name is
        <strong>Maksym Novikov.</strong> I am a Front-end engineer with
        <strong
          ><span class="whitespace-nowrap">{{ startWorkingDate }}</span> of
          experience</strong
        >
        in developing projects of different scales.
      </p>

      <p class="mb-3">
        My primary responsibilities are developing projects from scratch and
        support of existing projects. I also had an experience of team
        management and working with customers.
      </p>

      <p>
        I dedicate my free time to studying and contributing to open source.
      </p>
    </div>

    <contacts-block class="mt-4" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { WORKING_START_DATE } from "@/shared/constants";
import CanvasAnimation from "@/components/CanvasAnimation.vue";
import ContactsBlock from "@/components/ContactsBlock.vue";

dayjs.extend(relativeTime);

export default defineComponent({
  components: {
    ContactsBlock,
    CanvasAnimation,
  },
  computed: {
    startWorkingDate(): string {
      return dayjs(WORKING_START_DATE).fromNow(true);
    },
  },
});
</script>
