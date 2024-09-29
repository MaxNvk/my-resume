<script setup lang="ts">
import { onBeforeUnmount, onMounted, type Ref, ref } from "vue";
import {
  DrawingUtils,
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

const videoWidth = 700;

const constraints: MediaStreamConstraints = {
  audio: false,
  video: true,
};

const faceLandMarker = ref<FaceLandmarker>(null);

const videoRef = ref<HTMLVideoElement>(null);
const canvasRef = ref<HTMLCanvasElement>(null);

const createFaceLandMarker = async () => {
  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm"
  );

  faceLandMarker.value = await FaceLandmarker.createFromOptions(
    filesetResolver,
    {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numFaces: 1,
    }
  );
};

const faceResults = ref(null);
const drawingUtils = ref(null);

const createDrawingUtils = () => {
  const canvasCtx = canvasRef.value.getContext("2d");

  drawingUtils.value = new DrawingUtils(canvasCtx);
};

const lastVideoTime = ref(-1);

const predictWebcam = async () => {
  if (!faceLandMarker.value || !videoRef.value) {
    console.error("Face Landmarker or Video element not initialized");
    return;
  }

  try {
    const ratio = videoRef.value.videoHeight / videoRef.value.videoWidth;
    videoRef.value.style.width = videoWidth + "px";
    videoRef.value.style.height = videoWidth * ratio + "px";
    canvasRef.value.style.width = videoWidth + "px";
    canvasRef.value.style.height = videoWidth * ratio + "px";
    canvasRef.value.width = videoRef.value.videoWidth;
    canvasRef.value.height = videoRef.value.videoHeight;

    await faceLandMarker.value.setOptions({ runningMode: "VIDEO" });

    const startTimeMs = performance.now();
    if (lastVideoTime.value !== videoRef.value.currentTime) {
      lastVideoTime.value = videoRef.value.currentTime;

      faceResults.value = faceLandMarker.value.detectForVideo(
        videoRef.value,
        startTimeMs
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const animationFrameId = ref(null);

const initWebcam = async (videoRef: Ref<HTMLVideoElement>) => {
  videoRef.value.srcObject = await navigator.mediaDevices.getUserMedia(
    constraints
  );

  videoRef.value.addEventListener("loadeddata", predictWebcam);
};

onMounted(async () => {
  try {
    await Promise.all([createFaceLandMarker(), initWebcam(videoRef)]);

    createDrawingUtils();

    // Continuously call `predictWebcam` in a loop to handle real-time detection
    const loop = async () => {
      await predictWebcam();

      animationFrameId.value = requestAnimationFrame(loop);
    };

    await loop();
  } catch (error) {
    console.error(error);
  }
});

onBeforeUnmount(() => {
  if (!animationFrameId.value) return;

  window.cancelAnimationFrame(animationFrameId.value);
});
</script>

<template>
  <div class="relative -scale-x-100">
    <video ref="videoRef" autoplay playsinline />
    <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full" />
  </div>
</template>

<style scoped></style>
