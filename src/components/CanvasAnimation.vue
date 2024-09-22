<template>
  <canvas ref="canvas" />
</template>

<script lang="ts" setup>
import { getDegreeSin } from "@/utils/get-degree-sin";
import type { IAnimationRect } from "@/shared/interfaces/animation-rect.interface";
import { ERectColor } from "@/shared/enums/rect-color.enum";
import { onMounted, onUnmounted, ref } from "vue";

const ROWS_COUNT = 35;
const COLS_COUNT = 45;
const CIRCLE_DEGREES = 360;
const WAVE_SIZE = 1.25;
const RECT_SIZE = 1;
const DEGREE_STEP = CIRCLE_DEGREES / COLS_COUNT;
const LAST_ROW_INDEX = Math.floor(ROWS_COUNT / 2 - 1);

const SHADOW_OFFSET = 4;

const TOP_POSITION = WAVE_SIZE * 2 + SHADOW_OFFSET;
const LEFT_POSITION = 1 + SHADOW_OFFSET;

const IMAGE_HEIGHT =
  ROWS_COUNT * RECT_SIZE + TOP_POSITION * 2 + WAVE_SIZE * 2 + SHADOW_OFFSET;
const IMAGE_WIDTH = COLS_COUNT + LEFT_POSITION * 2 + SHADOW_OFFSET;

// const { storageValue } = useLocalStorage("theme");

// const isDarkMode = computed(() => storageValue.value === "dark");

const getAnimationState = (offset: number): IAnimationRect[][] => {
  const topColor = /*isDarkMode.value ? ERectColor.Red :*/ ERectColor.Blue;
  const bottomColor =
    /*isDarkMode.value ? ERectColor.Black :*/ ERectColor.Yellow;
  const matrix: IAnimationRect[][] = [];

  for (let row = 0; row < ROWS_COUNT; row++) {
    matrix[row] = [];

    for (let col = 0; col < COLS_COUNT; col++) {
      const degree = DEGREE_STEP * offset + DEGREE_STEP * col;

      matrix[row][col] = {
        color: row <= LAST_ROW_INDEX ? topColor : bottomColor,
        x: LEFT_POSITION + col * RECT_SIZE,
        y: TOP_POSITION + row * RECT_SIZE + getDegreeSin(degree) * WAVE_SIZE,
      };
    }
  }

  return matrix;
};

const step = ref(0);
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

const initializeAnimation = (): void => {
  setCanvasSize();
  draw(0);

  setAnimation();
};

onMounted(initializeAnimation);

onUnmounted(() => {
  clearTimeout(timeout.value);
});

const canvas = ref<HTMLCanvasElement>(null);

const setCanvasSize = (): void => {
  const ctx = canvas.value.getContext("2d");
  canvas.value.width = IMAGE_WIDTH;
  canvas.value.height = IMAGE_HEIGHT;

  // Get the DPR and size of the canvas
  const dpr = window.devicePixelRatio;
  const rect = canvas.value.getBoundingClientRect();

  // Set the "actual" size of the canvas
  canvas.value.width = rect.width * dpr;
  canvas.value.height = rect.height * dpr;

  // Scale the context to ensure correct drawing operations
  ctx.scale(dpr, dpr);

  // Set the "drawn" size of the canvas
  canvas.value.style.width = `${rect.width}px`;
  canvas.value.style.height = `${rect.height}px`;
};

const setAnimation = (): void => {
  requestAnimationFrame(() => {
    step.value = step.value >= COLS_COUNT ? 0 : step.value + 1;

    draw(step.value);

    timeout.value = setTimeout(setAnimation, 25);
  });
};

const draw = (offset: number) => {
  const ctx = canvas.value.getContext("2d", {
    alpha: false,
  }) as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // Set shadow params
  ctx.shadowBlur = 6;
  ctx.shadowColor = "rgba(0,0,0, 0.65)";
  ctx.shadowOffsetY = SHADOW_OFFSET;
  ctx.shadowOffsetX = SHADOW_OFFSET;
  //

  // Draw flag
  const matrix = getAnimationState(offset);

  matrix.forEach((row) =>
    row.forEach((col) => {
      ctx.fillStyle = col.color;

      ctx.fillRect(col.x, col.y, RECT_SIZE, RECT_SIZE);
    })
  );
  //
};
</script>
