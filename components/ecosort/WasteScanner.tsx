"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Camera, Sparkles, RefreshCw, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { ClassificationResult } from "@/types/ecosort";

interface WasteScannerProps {
  onScanResult: (result: ClassificationResult) => void;
}

export default function WasteScanner({ onScanResult }: WasteScannerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeSampleKey, setActiveSampleKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const samplePresets = [
    { key: "plastic_bottle", label: "🥤 PET Plastic Bottle", icon: "🥤" },
    { key: "old_phone", label: "💻 Smartphone (E-Waste)", icon: "📱" },
    { key: "newspaper", label: "📄 Newspaper & Cardboard", icon: "📰" },
    { key: "banana_peel", label: "🍌 Fruit & Food Scraps", icon: "🍌" },
    { key: "pizza_box", label: "🍕 Greasy Pizza Box", icon: "🍕" },
    { key: "metal_can", label: "🥫 Aluminum Can", icon: "🥫" },
    { key: "glass_bottle", label: "🍾 Glass Jar / Bottle", icon: "🍾" },
    { key: "battery", label: "🔋 AA Battery / Hazardous", icon: "🔋" },
    { key: "plastic_bag", label: "🛍️ Plastic Bags", icon: "🛍️" },
    { key: "laptop_charger", label: "🔌 Charger & Cable", icon: "🔌" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSelectedImage(dataUrl);
      setActiveSampleKey(null);
      analyzeWasteImage({ fileName: file.name });
    };
    reader.readAsDataURL(file);
  };

  const handleSampleSelect = (sampleKey: string) => {
    setActiveSampleKey(sampleKey);
    setSelectedImage(null);
    analyzeWasteImage({ sampleKey });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveSampleKey(null);
    analyzeWasteImage({ searchQuery: searchQuery.trim() });
  };

  const analyzeWasteImage = async (params: { sampleKey?: string; fileName?: string; searchQuery?: string }) => {
    setIsScanning(true);
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      if (data.success) {
        onScanResult(data.result);
      }
    } catch (err) {
      console.error("Scan error:", err);
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
          placeholder="Search any item (e.g. pizza box, battery, laptop charger, milk bottle)..."
          className="w-full bg-slate-900/90 border border-slate-800 text-white rounded-2xl py-3.5 pl-12 pr-28 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-xl placeholder-slate-500 transition-all"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
        <button
          type="submit"
          disabled={isScanning}
          className="absolute right-2 top-2 px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md disabled:opacity-50"
        >
          {isScanning ? "Searching..." : "Classify"}
        </button>
      </form>

      {/* Scanner Upload Container */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>AI Vision & Neural Classifier</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Upload Photo or Select Item
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Our AI detects waste material, bin category, confidence score & step-by-step disposal action.
            </p>
          </div>

          {/* Drag & Drop Upload Area */}
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
                <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden ring-4 ring-cyan-500/40 shadow-xl">
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
                  <p className="text-slate-500 text-xs">Supports JPG, PNG, WEBP up to 10MB</p>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" />
                <p className="text-cyan-400 font-bold text-sm tracking-wide">
                  Analyzing Waste Material...
                </p>
              </div>
            )}
          </div>

          {/* Expanded Sample Presets */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Or Try Instant AI Presets:
            </p>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => handleSampleSelect(preset.key)}
                  className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSampleKey === preset.key
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
