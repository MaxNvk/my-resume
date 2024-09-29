import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import {
  DrawingUtils,
  FaceLandmarker,
  FaceLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { createFaceLandMarker } from "./utils/create-landmarker";
import { ColorPicker } from "./components/picker/color-picker";

const videoWidth = 600;

const constraints: MediaStreamConstraints = {
  audio: false,
  video: {
    width: { ideal: videoWidth },
    height: { ideal: videoWidth },
    noiseSuppression: true,
  },
};

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [lipsColor, setLipsColor] = useState("#000");

  const setElementsParams = () => {
    videoRef.current!.style.width = videoWidth + "px";
    videoRef.current!.style.height = videoWidth + "px";
    canvasRef.current!.style.width = videoWidth + "px";
    canvasRef.current!.style.height = videoWidth + "px";
    canvasRef.current!.width = videoRef.current!.videoWidth;
    canvasRef.current!.height = videoRef.current!.videoHeight;
  };

  const [lastVideoTime, setLastVideoTime] = useState(-1);

  const drawLandmarks = useCallback(
    (results: FaceLandmarkerResult) => {
      const canvasCtx = canvasRef.current!.getContext("2d");
      const canvasWidth = canvasRef.current!.width;
      const canvasHeight = canvasRef.current!.height;

      const drawingUtils = new DrawingUtils(
        canvasCtx as CanvasRenderingContext2D
      );

      if (results!.faceLandmarks) {
        for (const landmarks of results!.faceLandmarks) {
          // Draw the lip connectors (stroke)
          drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LIPS,
            {
              color: lipsColor,
              lineWidth: 5,
            }
          );

          // Indices of the outer lip landmarks (define the outer contour)
          const outerLipsIndices = [
            61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269,
            267, 0, 37, 39, 40, 185, 61,
          ];

          // Indices of the inner lip landmarks (define the mouth opening)
          const innerLipsIndices = [
            78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311,
            312, 13, 82, 81, 80, 191, 78,
          ];

          canvasCtx!.beginPath();

          // Draw outer lips path
          const firstOuterPoint = landmarks[outerLipsIndices[0]];
          canvasCtx!.moveTo(
            firstOuterPoint.x * canvasWidth,
            firstOuterPoint.y * canvasHeight
          );

          for (let i = 1; i < outerLipsIndices.length; i++) {
            const point = landmarks[outerLipsIndices[i]];
            canvasCtx!.lineTo(point.x * canvasWidth, point.y * canvasHeight);
          }
          canvasCtx!.closePath();

          // Draw inner lips path (mouth opening)
          canvasCtx!.moveTo(
            landmarks[innerLipsIndices[0]].x * canvasWidth,
            landmarks[innerLipsIndices[0]].y * canvasHeight
          );

          for (let i = 1; i < innerLipsIndices.length; i++) {
            const point = landmarks[innerLipsIndices[i]];
            canvasCtx!.lineTo(point.x * canvasWidth, point.y * canvasHeight);
          }
          canvasCtx!.closePath();

          // Set the fill rule to "evenodd" to create a hole
          canvasCtx!.fillStyle = lipsColor;
          canvasCtx!.fill("evenodd");
        }
      }
    },
    [lipsColor]
  );

  const predictWebcam = useCallback(
    async (faceLandmarker: FaceLandmarker) => {
      setElementsParams();

      let startTimeMs = performance.now();
      let results: FaceLandmarkerResult;

      if (lastVideoTime !== videoRef.current!.currentTime) {
        setLastVideoTime(videoRef.current!.currentTime);

        results = faceLandmarker.detectForVideo(videoRef.current!, startTimeMs);
      }

      drawLandmarks(results!);

      requestAnimationFrame(() => predictWebcam(faceLandmarker));
    },
    [drawLandmarks, lastVideoTime]
  );

  // Enable the live webcam view and start detection.
  const enableCam = useCallback(
    (faceLandmarker: FaceLandmarker) => {
      if (!faceLandmarker) {
        console.log("Wait! faceLandmarker not loaded yet.");
        return;
      }

      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.addEventListener("loadeddata", () =>
          predictWebcam(faceLandmarker)
        );
      });
    },
    [predictWebcam]
  );

  const init = async () => {
    const faceLandMarker = await createFaceLandMarker();
    enableCam(faceLandMarker);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="relative -scale-x-100 w-max">
        <video ref={videoRef} autoPlay playsInline muted />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        <ColorPicker
          value={lipsColor}
          onChange={(value) => setLipsColor(value)}
        />
      </div>
    </div>
  );
}

export default App;
