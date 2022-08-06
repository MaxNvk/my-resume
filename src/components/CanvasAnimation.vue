<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getDegreeSin } from "@/utils/get-degree-sin";
import type { IAnimationRect } from "@/shared/interfaces/animation-rect.interface";
import { ERectColor } from "@/shared/enums/rect-color.enum";
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

const ANIMATION_UPDATE_TIMEOUT = 50;

const IMAGE_HEIGHT =
  ROWS_COUNT * RECT_SIZE + TOP_POSITION * 2 + WAVE_SIZE * 2 + SHADOW_OFFSET;
const IMAGE_WIDTH = COLS_COUNT + LEFT_POSITION * 2 + SHADOW_OFFSET;

const getAnimationState = (offset: number): IAnimationRect[][] => {
  const matrix: IAnimationRect[][] = [];

  for (let row = 0; row < ROWS_COUNT; row++) {
    matrix[row] = [];

    for (let col = 0; col < COLS_COUNT; col++) {
      const degree = DEGREE_STEP * offset + DEGREE_STEP * col;

      matrix[row][col] = {
        color: row <= LAST_ROW_INDEX ? ERectColor.Blue : ERectColor.Yellow,
        x: LEFT_POSITION + col * RECT_SIZE,
        y: TOP_POSITION + row * RECT_SIZE + getDegreeSin(degree) * WAVE_SIZE,
      };
    }
  }

  return matrix;
};

export default defineComponent({
  data() {
    return {
      drawTimeout: undefined as unknown as ReturnType<typeof setTimeout>,
      step: 0,
    };
  },
  mounted() {
    this.initializeAnimation();
  },
  methods: {
    initializeAnimation(): void {
      this.setCanvasSize();
      this.draw(0);

      this.setAnimation();
    },

    setCanvasSize(): void {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.width = IMAGE_WIDTH;
      canvas.height = IMAGE_HEIGHT;

      // Get the DPR and size of the canvas
      const dpr = window.devicePixelRatio;
      const rect = canvas.getBoundingClientRect();

      // Set the "actual" size of the canvas
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr);

      // Set the "drawn" size of the canvas
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    },

    setAnimation(): void {
      clearTimeout(this.drawTimeout);

      this.drawTimeout = setTimeout(() => {
        this.step = this.step >= COLS_COUNT ? 0 : this.step + 1;

        this.draw(this.step);

        this.setAnimation();
      }, ANIMATION_UPDATE_TIMEOUT);
    },

    draw(offset: number) {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext("2d", {
        alpha: false,
      }) as CanvasRenderingContext2D;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set shadow params
      ctx.shadowBlur = 1;
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
    },
  },
});
</script>

<style lang="scss" scoped></style>
