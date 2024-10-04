import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import {
  DrawingUtils,
  FaceLandmarker,
  FaceLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { createFaceLandMarker } from "./utils/create-landmarker";
import { ColorPicker } from "./components/picker/color-picker";
import { hexToRgb } from "./utils/hex-to-rgb";

const videoWidth = 400;

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

  const [faceLandMarker, setFaceLandMarker] = useState<FaceLandmarker>();

  const lipsColor = useRef("#000");

  const setElementsParams = () => {
    videoRef.current!.style.width = videoWidth + "px";
    videoRef.current!.style.height = videoWidth + "px";
    canvasRef.current!.style.width = videoWidth + "px";
    canvasRef.current!.style.height = videoWidth + "px";
    canvasRef.current!.width = videoRef.current!.videoWidth;
    canvasRef.current!.height = videoRef.current!.videoHeight;
  };

  const drawLandmarks = useCallback((results: FaceLandmarkerResult) => {
    const canvasCtx = canvasRef.current!.getContext("2d");
    const canvasWidth = canvasRef.current!.width;
    const canvasHeight = canvasRef.current!.height;

    const drawingUtils = new DrawingUtils(
      canvasCtx as CanvasRenderingContext2D
    );

    canvasCtx!.clearRect(0, 0, canvasWidth, canvasHeight);

    const rgbColor = hexToRgb(lipsColor.current);
    const rgbaColor = `rgba(${rgbColor?.r}, ${rgbColor?.g}, ${rgbColor?.b}, 0.45)`;
    const rgbaColorStroke = `rgba(${rgbColor?.r}, ${rgbColor?.g}, ${rgbColor?.b}, 0.075)`;

    if (results!.faceLandmarks) {
      for (const landmarks of results!.faceLandmarks) {
        // Draw the lip connectors (stroke)
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LIPS,
          {
            color: rgbaColorStroke,
            lineWidth: 4,
          }
        );

        // Indices of the outer lip landmarks (define the outer contour)
        const outerLipsIndices = [
          61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267,
          0, 37, 39, 40, 185, 61,
        ];

        // Indices of the inner lip landmarks (define the mouth opening)
        const innerLipsIndices = [
          78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312,
          13, 82, 81, 80, 191, 78,
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
        canvasCtx!.fillStyle = rgbaColor;
        canvasCtx!.fill("evenodd");
      }
    }
  }, []);

  const predictWebcam = useCallback(async () => {
    setElementsParams();

    let startTimeMs = performance.now();
    let results: FaceLandmarkerResult = faceLandMarker!.detectForVideo(
      videoRef.current!,
      startTimeMs
    );

    if (results) drawLandmarks(results);

    requestAnimationFrame(predictWebcam);
  }, [drawLandmarks, faceLandMarker]);

  // Enable the live webcam view and start detection.
  const enableCam = useCallback(() => {
    if (!faceLandMarker) {
      console.log("Wait! faceLandmarker not loaded yet.");
      return;
    }

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      videoRef.current!.srcObject = stream;
      videoRef.current!.addEventListener("loadeddata", predictWebcam);
    });
  }, [faceLandMarker, predictWebcam]);

  const setLandMarker = async () => {
    setFaceLandMarker(await createFaceLandMarker());
  };

  useEffect(() => {
    setLandMarker();
  }, []);

  useEffect(() => {
    if (!faceLandMarker) return;

    enableCam();
  }, [enableCam, faceLandMarker]);

  // const client = new OpenAI({
  //   apiKey: "My API Key",
  //   dangerouslyAllowBrowser: true,
  // });

  return (
    <div className="flex flex-col items-center justify-center font-mono bg-pink-300 min-h-screen text-center">
      <h1 className="text-5xl font-bold">Pick your lips color</h1>

      <div className="relative -scale-x-100 w-max rounded-xl overflow-hidden my-5">
        <video ref={videoRef} autoPlay playsInline muted />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      <p className="flex items-center px-4">
        <span className="pr-3">Pick color of the lips:</span>

        <ColorPicker
          value={lipsColor.current}
          onChange={(value) => (lipsColor.current = value)}
        />
      </p>
    </div>
  );
}

export default App;
