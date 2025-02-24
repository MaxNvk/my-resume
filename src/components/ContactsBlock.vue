<template>
  <div class="flex items-center gap-x-4">
    <strong>My contacts:</strong>

    <a class="text-red-400" :href="`mailto:${EMAIL_ADDRESS}`">
      <font-awesome-icon icon="at" />
    </a>

    <a class="text-red-400" :href="TELEGRAM_LINK">
      <font-awesome-icon :icon="['fab', 'telegram-plane']" />
    </a>

    <a class="text-red-400" :href="LINKEDIN_LINK" target="_blank">
      <font-awesome-icon :icon="['fab', 'linkedin']" />
    </a>
  </div>
</template>

<script lang="ts" setup>
import {
  EMAIL_ADDRESS,
  TELEGRAM_LINK,
  LINKEDIN_LINK,
} from "@/shared/constants";
</script>

<style lang="scss" scoped></style>
