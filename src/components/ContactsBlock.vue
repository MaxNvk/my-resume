<template>
  <div class="flex items-center gap-x-4">
    <strong>My contacts:</strong>

    <a class="text-red-400" :href="`mailto:${EMAIL_ADDRESS}`">
      <font-awesome-icon icon="at" />
    </a>

    <a class="text-red-400" :href="TELEGRAM_LINK">
      <font-awesome-icon :icon="['fa-brands', 'telegram-plane']" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EMAIL_ADDRESS, TELEGRAM_LINK } from "@/shared/constants";

export default defineComponent({
  setup() {
    return {
      TELEGRAM_LINK,
      EMAIL_ADDRESS,
    };
  },
});
</script>

<style lang="scss" scoped></style>
