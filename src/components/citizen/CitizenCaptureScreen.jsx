import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Flame, 
  Lock, 
  MapPin, 
  Mic, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  Zap, 
  ZapOff, 
  Cpu, 
  Eye, 
  EyeOff, 
  Bot, 
  UserX, 
  ArrowLeft,
  X
} from 'lucide-react';

export const CitizenCaptureScreen = ({ onCaptureComplete, onBurnProtocol, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [useRealCamera, setUseRealCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isWiping, setIsWiping] = useState(false);
  const [autoRedactBystanders, setAutoRedactBystanders] = useState(true);
  const [flashScreen, setFlashScreen] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const timerRef = useRef(null);

  // 3-Second Recording Simulation Flow
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          const next = prev + 1;
          if (next >= 3) {
            clearInterval(timerRef.current);
            setTimeout(() => {
              let capturedPhoto = "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80";
              
              if (videoRef.current && useRealCamera) {
                try {
                  const canvas = document.createElement('canvas');
                  canvas.width = videoRef.current.videoWidth || 640;
                  canvas.height = videoRef.current.videoHeight || 480;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                  capturedPhoto = canvas.toDataURL('image/jpeg', 0.85);
                } catch (e) {}
              }

              if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((t) => t.stop());
              }

              onCaptureComplete({
                timestamp: new Date().toISOString(),
                durationSeconds: 3,
                capturedPhoto: capturedPhoto,
                sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                location: {
                  coordinates: "18.5204° N, 73.8567° E",
                  ward: "Ward 14 (Kothrud)",
                  locationName: "Paud Road Divisional Office, Pune"
                },
                coordinates: "18.5204° N, 73.8567° E",
                ward: "Ward 14 (Kothrud)",
                locationName: "Paud Road Divisional Office, Pune",
                category: "Anti-Corruption",
                subCategory: "Town Planning Extortion & Bribery",
                text: {
                  description: "Town Planning officer soliciting illegal financial remuneration to process building sanction file.",
                  transcript: [
                    { speaker: "Officer", time: "00:02", text: "Give me 500 rupees or I won't clear the file.", highlight: "500 rupees" }
                  ]
                },
                bystanderRedacted: autoRedactBystanders
              });
            }, 300);
            return 3;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, onCaptureComplete, autoRedactBystanders]);

  // Real WebCam Stream toggle
  const toggleRealCamera = async () => {
    if (useRealCamera) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setUseRealCamera(false);
      setCameraError(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setUseRealCamera(true);
        setCameraError(null);
      } catch (err) {
        setCameraError("Camera permission denied. Running in optical simulation mode.");
        setUseRealCamera(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleShutterPress = () => {
    setFlashScreen(true);
    setTimeout(() => setFlashScreen(false), 120);
    setIsRecording(true);
    setRecordingSeconds(0);
  };

  const handleBurn = () => {
    setIsWiping(true);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setTimeout(() => {
      onBurnProtocol();
    }, 700);
  };

  return (
    <div className={`w-full bg-black rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 flex flex-col relative select-none ${isWiping ? 'animate-burn-wipe' : ''}`}>
      {/* Shutter Screen Flash Effect */}
      {flashScreen && (
        <div className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-150 opacity-90"></div>
      )}

      {/* ========================================================================= */}
      {/* 1. CAMERA VIEWPORT (MATCHING EXACT REFERENCE IMAGE TOP & CENTER SHAPE)   */}
      {/* ========================================================================= */}
      <div className="relative w-full aspect-[9/16] min-h-[480px] bg-[#181818] flex flex-col justify-between overflow-hidden">
        {/* Real Video Element if WebCam enabled */}
        {useRealCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          /* High-Fidelity Minimal Dark Viewfinder */
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0f0f0f] flex flex-col items-center justify-center">
            {/* Subtle Rule of Thirds Optical Grid */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-10">
              <div className="border-r border-b border-white"></div>
              <div className="border-r border-b border-white"></div>
              <div className="border-b border-white"></div>
              <div className="border-r border-b border-white"></div>
              <div className="border-r border-b border-white"></div>
              <div className="border-b border-white"></div>
              <div className="border-r border-b border-white"></div>
              <div className="border-r border-b border-white"></div>
              <div></div>
            </div>

            {/* Viewfinder Center Reticle */}
            <div className="relative flex items-center justify-center opacity-40">
              <div className="w-16 h-16 rounded-full border border-dashed border-white/40 flex items-center justify-center">
                <Camera className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* TOP BUTTONS (MATCHING EXACT CIRCULAR BUTTONS IN REFERENCE IMAGE) */}
        <div className="relative z-30 p-4 pt-5 flex items-center justify-between">
          {/* Top-Left Dark Circular Button (Exit / Cancel) */}
          <button
            onClick={onCancel}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 backdrop-blur-md flex items-center justify-center text-white/90 border border-white/10 transition-all cursor-pointer shadow-md"
            title="Exit Camera"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Center Security Indicators */}
          <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>RAM BUFFER ONLY</span>
          </div>

          {/* Top-Right Dark Circular Button (Camera Flip / WebCam Toggle) */}
          <button
            onClick={toggleRealCamera}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 backdrop-blur-md flex items-center justify-center text-white/90 border border-white/10 transition-all cursor-pointer shadow-md"
            title={useRealCamera ? "Switch to HUD Mode" : "Enable WebCam"}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* AI Face Redaction Bounding Box in Viewfinder */}
        {autoRedactBystanders && (
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-24 h-28 pointer-events-none z-20">
            <div className="w-full h-full rounded-xl border border-dashed border-cyan-400/80 bg-cyan-950/30 backdrop-blur-md flex flex-col items-center justify-between p-1.5 shadow-lg">
              <div className="w-full flex items-center justify-between text-[6.5px] font-mono text-cyan-300 bg-black/70 px-1 py-0.5 rounded">
                <span className="flex items-center gap-0.5">
                  <Bot className="w-2 h-2 text-cyan-400" /> YOLO-Edge
                </span>
                <span className="text-emerald-400 font-bold">98%</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-dashed border-cyan-300/60 flex items-center justify-center">
                <UserX className="w-4 h-4 text-cyan-200" />
              </div>
              <span className="text-[6.5px] font-mono text-cyan-200 uppercase text-center leading-none">
                Bystander Blur
              </span>
            </div>
          </div>
        )}

        {/* Telemetry Chips at Viewfinder Bottom Corners */}
        <div className="relative z-30 p-4 pb-3 flex items-center justify-between text-[9px] font-mono">
          <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-slate-300 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-emerald-400" />
            <span>18.5204° N, 73.8567° E</span>
          </div>

          <button
            onClick={handleBurn}
            className="bg-red-950/70 hover:bg-red-900 active:scale-95 text-red-300 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-red-600/60 flex items-center gap-1 cursor-pointer transition-colors"
            title="Instant RAM wipe"
          >
            <Flame className="w-3 h-3 text-red-400" />
            <span className="font-bold">BURN</span>
          </button>
        </div>

        {/* Active Recording 3-Second Counter */}
        {isRecording && (
          <div className="absolute top-16 inset-x-0 flex justify-center z-30 pointer-events-none">
            <div className="bg-red-600 text-white font-mono text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-lg border border-red-400 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>RECORDING [{recordingSeconds}s / 3s]</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. SOLID BLACK BOTTOM PANEL (MATCHING EXACT SHUTTER & SUBTEXT IN IMAGE)  */}
      {/* ========================================================================= */}
      <div className="bg-black px-6 pt-5 pb-7 flex flex-col items-center justify-center space-y-3 z-30 border-t border-slate-900">
        {/* THE CONCENTRIC WHITE CIRCULAR SHUTTER BUTTON */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing ring during recording */}
          {isRecording && (
            <div className="absolute -inset-3 rounded-full bg-red-500/25 animate-ping pointer-events-none"></div>
          )}

          {/* Outer Thick White Ring (exact match to reference image) */}
          <div className="w-20 h-20 rounded-full border-[4px] border-white flex items-center justify-center p-1.5 bg-transparent shadow-xl transition-transform active:scale-95">
            {/* Inner Solid White Circle Button (morphs to rounded red square on record) */}
            <button
              onClick={handleShutterPress}
              disabled={isRecording}
              className={`w-full h-full rounded-full transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center ${
                isRecording 
                  ? 'bg-red-600 scale-75 rounded-lg ring-4 ring-red-400 animate-pulse' 
                  : 'bg-white hover:bg-slate-100 active:scale-90'
              }`}
              title="Tap for photo · hold for video"
            >
              {isRecording && (
                <div className="w-3 h-3 bg-white rounded-xs"></div>
              )}
            </button>
          </div>
        </div>

        {/* EXACT SUBTEXT FROM REFERENCE IMAGE */}
        <p className="text-[11px] text-slate-400 font-serif italic text-center tracking-wide">
          Tap for photo · hold for video
        </p>
      </div>
    </div>
  );
};
