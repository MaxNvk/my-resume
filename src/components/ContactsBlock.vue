<template>
  <div class="flex items-center gap-x-4">
    <strong>My contacts:</strong>

    <a class="text-red-400" :href="`mailto:${EMAIL_ADDRESS}`">
      <font-awesome-icon icon="at" />
    </a>

    <a class="text-red-400" :href="TELEGRAM_LINK">
      <font-awesome-icon :icon="['fa-brands', 'telegram-plane']" />
    </a>

    <a class="text-red-400" :href="`tel:${PHONE_NUMBER}`">
      <font-awesome-icon icon="phone" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EMAIL_ADDRESS, PHONE_NUMBER, TELEGRAM_LINK } from "@/shared/constants";

export default defineComponent({
  setup() {
    return {
      PHONE_NUMBER,
      TELEGRAM_LINK,
      EMAIL_ADDRESS,
    };
  },
});
</script>

<style lang="scss" scoped></style>
