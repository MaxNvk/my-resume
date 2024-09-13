<template>
  <button @click="onClick" />
</template>

<script lang="ts" setup>
import { useLocalStorage } from "@/shared/composable/useLocalStorage";

const { setStorageValue } = useLocalStorage("theme", "light");

const onClick = (): void => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    setStorageValue("light");
  } else {
    document.body.classList.add("dark");
    setStorageValue("dark");
  }
};
</script>

<style lang="scss" scoped>
button {
  @apply bg-gray-800 dark:bg-gray-200 fixed top-16 right-8 w-3 h-3 rounded-full;
  @apply transform transition-transform duration-150;

  &:active {
    @apply scale-75;
  }
}
</style>
