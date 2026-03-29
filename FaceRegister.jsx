import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FaceRegister() {
  const videoRef = useRef();

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoRef.current.srcObject = stream);
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  };

  const captureFace = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) return alert("No face detected");

    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("http://localhost:5000/api/users/register-face", {
      userId: user._id,
      descriptor: Array.from(detection.descriptor)
    });

    alert("✅ Face Registered");
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay className="w-96 mb-4" />
      <button onClick={captureFace} className="bg-blue-500 text-white p-2">
        Register Face
      </button>
    </div>
  );
}