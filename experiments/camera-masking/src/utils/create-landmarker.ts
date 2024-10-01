import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const createFaceLandMarker = async () => {
  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU",
    },
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: true,
    runningMode: "VIDEO",
    numFaces: 2,
  });

  return landmarker;
};
