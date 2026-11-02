"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Upload,
  Camera,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  VideoOff,
  SwitchCamera,
  AlertCircle,
  Zap,
} from "lucide-react";
import { ClassificationResult } from "@/types/wasteiq";
import { playSound } from "@/lib/wasteDatabase";

interface WasteScannerProps {
  onScanResult: (result: ClassificationResult) => void;
}

export default function WasteScanner({ onScanResult }: WasteScannerProps) {
  const [mode, setMode] = useState<"upload" | "camera">("camera");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Camera cleanup on unmount or mode switch
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  const startCamera = async (facing: "environment" | "user" = cameraFacing) => {
    stopCameraStream();
    setCameraError(null);
    try {
      playSound("click");
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: unknown) {
      console.warn("Camera access error:", err);
      setCameraError(
        "Could not access camera. Please verify camera permissions in your browser or use photo upload."
      );
      setIsCameraActive(false);
    }
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    playSound("scan");

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

    setSelectedImage(dataUrl);

    // Stop camera stream after capture
    stopCameraStream();
    setMode("upload");

    analyzeWasteImage({ imageBase64: dataUrl });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSelectedImage(dataUrl);
      analyzeWasteImage({ fileName: file.name, imageBase64: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    playSound("click");
    analyzeWasteImage({ searchQuery: searchQuery.trim() });
  };

  const analyzeWasteImage = async (params: {
    fileName?: string;
    searchQuery?: string;
    imageBase64?: string;
  }) => {
    setIsScanning(true);
    setErrorMessage(null);
    playSound("scan");

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      if (data.success && data.result) {
        playSound("success");
        onScanResult(data.result);
      } else {
        setErrorMessage(data.error || "Google Gemini was unable to classify this item. Please try another angle.");
      }
    } catch (err: any) {
      console.error("Scan error:", err);
      setErrorMessage("Network error during Gemini classification. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar for Quick Item Inquiry */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask Gemini to classify any item (e.g. blister pack, broken CFL, pizza box, PET bottle)..."
          className="w-full bg-slate-900/90 border border-slate-800 text-white rounded-2xl py-3.5 pl-12 pr-32 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-xl placeholder-slate-500 transition-all"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
        <button
          type="submit"
          disabled={isScanning || !searchQuery.trim()}
          className="absolute right-2 top-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md disabled:opacity-50"
        >
          {isScanning ? "Classifying..." : "Gemini AI"}
        </button>
      </form>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-3 text-rose-300 text-xs animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Mode Selector Tabs: Upload vs Live Camera */}
      <div className="flex items-center justify-between bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => {
            setMode("camera");
            startCamera();
          }}
          className={`flex-1 inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            mode === "camera"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Live Camera Scanner</span>
        </button>

        <button
          type="button"
          onClick={() => {
            stopCameraStream();
            setMode("upload");
          }}
          className={`flex-1 inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            mode === "upload"
              ? "bg-slate-800 text-white shadow-md border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Upload className="w-4 h-4 text-cyan-400" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Scanner Container */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>100% Google Gemini AI Vision</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {mode === "camera" ? "Live Camera Gemini Scanner" : "Upload Photo for Gemini Classification"}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Point your camera or upload a picture. Google Gemini Vision identifies material composition, municipal bin category, resin codes, and decomposition lifecycle in real time.
            </p>
          </div>

          {/* LIVE CAMERA MODE */}
          {mode === "camera" && (
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${isCameraActive ? "block" : "hidden"}`}
                />

                {/* Animated Targeting HUD overlay */}
                {isCameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
                    {/* Top corner brackets */}
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
                      <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
                    </div>

                    {/* Center reticle */}
                    <div className="self-center flex items-center justify-center">
                      <div className="w-24 h-24 border border-cyan-400/40 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      </div>
                    </div>

                    {/* Animated scanning laser line */}
                    <div className="absolute inset-x-8 top-1/4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] animate-bounce" />

                    {/* Bottom corner brackets */}
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
                      <div className="w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
                    </div>
                  </div>
                )}

                {!isCameraActive && (
                  <div className="p-6 text-center space-y-3">
                    <VideoOff className="w-10 h-10 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">
                      Camera Stream Inactive
                    </p>
                    {cameraError ? (
                      <p className="text-xs text-rose-400 max-w-sm mx-auto">{cameraError}</p>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Click below to grant camera access and start scanning.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                    >
                      Start Camera
                    </button>
                  </div>
                )}
              </div>

              {/* Camera Controls Bar */}
              {isCameraActive && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={captureCameraFrame}
                    disabled={isScanning}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 disabled:opacity-50"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Capture &amp; Classify with Gemini</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleCameraFacing}
                    title="Switch Camera (Front/Rear)"
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                  >
                    <SwitchCamera className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={stopCameraStream}
                    title="Stop Camera"
                    className="p-3 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 border border-slate-700 transition-all"
                  >
                    <VideoOff className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* UPLOAD MODE */}
          {mode === "upload" && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative cursor-pointer rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500/60 bg-slate-950/60 hover:bg-slate-900/60 p-8 text-center transition-all duration-300"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              {selectedImage ? (
                <div className="space-y-4">
                  <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden ring-4 ring-cyan-500/40 shadow-xl">
                    <Image
                      src={selectedImage}
                      alt="Uploaded Waste"
                      fill
                      className="object-cover"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">Click to upload another photo</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-semibold text-sm sm:text-base">
                      Drop your image here, or{" "}
                      <span className="text-cyan-400 underline">browse files</span>
                    </p>
                    <p className="text-slate-500 text-xs">Supports JPG, PNG, WEBP — sent directly to Google Gemini Vision</p>
                  </div>
                </div>
              )}

              {isScanning && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center space-y-3">
                  <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" />
                  <p className="text-cyan-400 font-bold text-sm tracking-wide">
                    Google Gemini AI Vision is analyzing your item...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Gemini AI Badges & Info */}
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Real-time visual inference running on Google Gemini</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Gemini Vision Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
