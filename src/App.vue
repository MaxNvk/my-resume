<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useHead } from "@vueuse/head";
import { setInitialTheme } from "@/utils/set-initial-theme";
useHead({
  title: "Maksym Novikov | Frontend Engineer",
  meta: [
    {
      name: "description",
      content: "You can view more info about me on this website.",
    },
    {
      property: "og:url",
      content: "https://maxnvk.github.io/",
    },
    {
      property: "og:title",
      content: "Maksym Novikov | Frontend Engineer",
    },
    {
      property: "og:description",
      content: "You can view more info about me on this website.",
    },
    {
      property: "og:image",
      content: "/og-image.png",
    },
  ],
});

onBeforeMount(() => {
  setInitialTheme();
});
</script>
