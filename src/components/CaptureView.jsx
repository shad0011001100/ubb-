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
  Radio, 
  Volume2, 
  Zap, 
  ZapOff,
  Cpu, 
  Eye, 
  EyeOff, 
  Video, 
  VideoOff,
  CheckCircle2,
  HardDrive,
  UserX,
  Sparkles,
  Bot,
  Activity,
  Sliders,
  Grid,
  Square,
  Circle
} from 'lucide-react';

export const CaptureView = ({ onCompleteCapture, onBurnMemory }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [bufferSizeMB, setBufferSizeMB] = useState(14.8);
  const [audioDecibels, setAudioDecibels] = useState(52);
  const [frameCount, setFrameCount] = useState(180);
  const [useRealCamera, setUseRealCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isWiping, setIsWiping] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [activeCameraMode, setActiveCameraMode] = useState('video'); // 'audio' | 'video' | 'snap'
  const [screenFlash, setScreenFlash] = useState(false);

  // SIH 2.0 Feature: Auto-Redact Bystanders AI Toggle
  const [autoRedactBystanders, setAutoRedactBystanders] = useState(true);
  
  // Simulated bounding box movement coordinates
  const [bboxPos, setBboxPos] = useState({ x: 54, y: 36 });

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const timerRef = useRef(null);

  // Live telemetry loop
  useEffect(() => {
    let interval = setInterval(() => {
      setAudioDecibels((prev) => Math.min(85, Math.max(34, prev + (Math.random() * 8 - 4))));
      setFrameCount((prev) => prev + 1);

      // Subtle AI bounding box drift to simulate real edge computer vision tracking
      setBboxPos((prev) => ({
        x: Math.max(48, Math.min(62, prev.x + (Math.random() * 2 - 1))),
        y: Math.max(30, Math.min(42, prev.y + (Math.random() * 2 - 1)))
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Handle Recording Timer & Buffer Accumulation
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
        setBufferSizeMB((prev) => Math.min(64.0, +(prev + 0.45).toFixed(2)));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Real Camera Stream Handling
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
        console.warn("Camera access not available, using simulated field camera:", err);
        setCameraError("Camera permission not granted. Running in high-fidelity optical simulation mode.");
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

  // Trigger shutter click with camera flash effect
  const handleRecordToggle = () => {
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 150);

    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      setBufferSizeMB(14.8);
    } else {
      setIsRecording(false);
    }
  };

  const handleSealAndProceed = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    onCompleteCapture({
      timestamp: new Date().toISOString(),
      durationSeconds: recordingSeconds > 0 ? recordingSeconds : 8,
      payloadSizeMB: bufferSizeMB,
      coordinates: '18.5204° N, 73.8567° E (Shivajinagar, Pune)',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      bystanderRedacted: autoRedactBystanders,
      bsaSec63Certified: true
    });
  };

  const handleBurn = () => {
    setIsWiping(true);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setTimeout(() => {
      onBurnMemory();
    }, 800);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-2.5 pb-4 relative ${isWiping ? 'animate-burn-wipe' : ''}`}>
      {/* Top Camera Status & Quick Control Strip */}
      <div className="bg-slate-900 text-slate-200 px-3 py-2 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="flex items-center space-x-1.5 bg-slate-950 px-2 py-0.5 rounded border border-slate-700">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="font-mono text-emerald-400 font-bold text-[10px]">RAM_VOLATILE</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono hidden xs:inline">ZERO DISK IO</span>
        </div>

        {/* Quick Toolbar (Flash, Auto-Redact, Camera Source) */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          {/* Flash Toggle */}
          <button
            onClick={() => setFlashEnabled(!flashEnabled)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              flashEnabled ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle Flash HUD"
          >
            {flashEnabled ? <Zap className="w-3.5 h-3.5 fill-amber-300" /> : <ZapOff className="w-3.5 h-3.5" />}
          </button>

          {/* AI Bystander Redaction Toggle */}
          <button
            onClick={() => setAutoRedactBystanders(!autoRedactBystanders)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1 transition-all cursor-pointer ${
              autoRedactBystanders
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60 shadow-2xs'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Real-Time AI Face Anonymization for Uninvolved Bystanders"
          >
            {autoRedactBystanders ? <EyeOff className="w-3 h-3 text-cyan-400" /> : <Eye className="w-3 h-3 text-slate-400" />}
            <span className="hidden sm:inline">AI Blur:</span> {autoRedactBystanders ? 'ON' : 'OFF'}
          </button>

          {/* WebCam / Simulation Mode Switcher */}
          <button
            onClick={toggleRealCamera}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={useRealCamera ? "Switch to High-Tech Simulated HUD" : "Enable Real WebCam"}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="bg-amber-950/80 border border-amber-800 text-amber-200 text-[10px] px-2.5 py-1.5 rounded-md flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* CAMERA VIEWPORT (MAIN OPTICAL VIEWFINDER WITH AUTHENTIC CAMERA HUD) */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl flex items-center justify-center">
        {/* Shutter Screen Flash Effect */}
        {screenFlash && (
          <div className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-150 opacity-90"></div>
        )}

        {/* Real Video Element if WebCam enabled */}
        {useRealCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          /* High-Fidelity Simulated Field Camera Viewport */
          <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center relative select-none">
            {/* Rule of Thirds Camera Grid */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
              <div className="border-r border-b border-white/60"></div>
              <div className="border-r border-b border-white/60"></div>
              <div className="border-b border-white/60"></div>
              <div className="border-r border-b border-white/60"></div>
              <div className="border-r border-b border-white/60"></div>
              <div className="border-b border-white/60"></div>
              <div className="border-r border-b border-white/60"></div>
              <div className="border-r border-b border-white/60"></div>
              <div></div>
            </div>

            {/* Viewfinder Center Autofocus Reticle */}
            <div className="relative flex items-center justify-center">
              <div className={`w-24 h-24 rounded-full border border-dashed flex items-center justify-center transition-colors duration-300 ${
                isRecording ? 'border-red-500/60 bg-red-950/10' : 'border-white/30'
              }`}>
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs">
                  <Camera className={`w-8 h-8 transition-colors ${isRecording ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
                </div>
              </div>
              {/* Corner Focus Brackets */}
              <div className="absolute -top-3 -left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400"></div>
              <div className="absolute -top-3 -right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400"></div>
              <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400"></div>
            </div>

            <p className="text-[10.5px] font-mono text-slate-400 mt-4 tracking-wider uppercase text-center px-4">
              [PMC FIELD SENSOR MATRIX ACTIVE]
              <br />
              <span className="text-[9.5px] text-slate-500">Center target on civic malpractice or extortion</span>
            </p>
          </div>
        )}

        {/* AI BYSTANDER PRIVACY REDACTION BOUNDING BOX OVERLAY */}
        {autoRedactBystanders && (
          <div 
            className="absolute z-25 transition-all duration-300 pointer-events-none"
            style={{
              top: `${bboxPos.y}%`,
              left: `${bboxPos.x}%`,
              width: '98px',
              height: '112px',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-full h-full rounded-lg border-2 border-dashed border-cyan-400 bg-cyan-950/40 backdrop-blur-md flex flex-col items-center justify-between p-1.5 shadow-lg">
              <div className="w-full flex items-center justify-between text-[7px] font-mono text-cyan-300 bg-slate-950/80 px-1 py-0.5 rounded border border-cyan-500/40">
                <span className="flex items-center gap-0.5">
                  <Bot className="w-2 h-2 text-cyan-400" /> YOLO-Edge
                </span>
                <span className="text-emerald-400 font-bold">98.4%</span>
              </div>

              <div className="w-9 h-9 rounded-full bg-slate-400/20 border border-dashed border-cyan-300/60 flex items-center justify-center backdrop-blur-lg my-auto">
                <UserX className="w-4 h-4 text-cyan-200" />
              </div>

              <div className="w-full text-center bg-cyan-950/90 text-cyan-200 text-[6.5px] font-mono font-bold py-0.5 rounded border border-cyan-500/50 uppercase leading-none">
                AI Face Redaction: Bystander [Protected]
              </div>
            </div>
          </div>
        )}

        {/* HUD Scanline Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-16 w-full animate-scanline pointer-events-none"></div>

        {/* SECURITY OVERLAY INDICATORS */}

        {/* 1. TOP-LEFT OVERLAY: Pulsing Red Dot + "RAM Buffer Only" */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <div className="bg-slate-950/85 backdrop-blur-md border border-red-500/60 rounded-md px-2 py-1 shadow-md flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono font-bold text-red-300 uppercase tracking-tight">
                RAM Buffer Only
              </span>
              <span className="text-[7.5px] font-mono text-slate-400 leading-none">
                (No Local Save / 0 Flash IO)
              </span>
            </div>
          </div>
        </div>

        {/* 2. TOP-RIGHT OVERLAY: "GPS Locked: 18.5204° N, 73.8567° E" */}
        <div className="absolute top-2.5 right-2.5 z-20 text-right">
          <div className="bg-slate-950/85 backdrop-blur-md border border-emerald-500/60 rounded-md px-2 py-1 shadow-md flex items-center space-x-1.5">
            <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0 animate-bounce" />
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-mono font-bold text-emerald-300">
                GPS Locked: 18.5204° N, 73.8567° E
              </span>
              <span className="text-[7.5px] font-mono text-slate-400 leading-none">
                Shivajinagar • Pune • Acc ±1.8m
              </span>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM-LEFT OVERLAY: "Audio Triage: Active" with Live Waveform */}
        <div className="absolute bottom-2.5 left-2.5 z-20">
          <div className="bg-slate-950/85 backdrop-blur-md border border-blue-500/60 rounded-md px-2 py-1 shadow-md flex items-center space-x-2">
            <Mic className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-[9px] font-mono font-bold text-blue-300">
                  Audio Triage: Active
                </span>
                <span className="text-[8px] font-mono text-slate-400">
                  ({audioDecibels.toFixed(0)} dB)
                </span>
              </div>
              <div className="flex items-end space-x-0.5 h-2.5 mt-0.5">
                {[4, 8, 3, 9, 6, 7, 10, 5, 8, 4, 6, 9].map((height, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-blue-400 rounded-xs transition-all duration-150"
                    style={{
                      height: isRecording 
                        ? `${Math.max(2, (height * (audioDecibels / 45)))}px` 
                        : `${height * 0.7}px`,
                      backgroundColor: isRecording ? '#60A5FA' : '#94A3B8'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM-RIGHT OVERLAY: Live Telemetry & RAM Heap Meter */}
        <div className="absolute bottom-2.5 right-2.5 z-20 text-right">
          <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700 rounded-md px-2 py-1 shadow-md">
            <div className="flex items-center justify-end space-x-1 text-[8.5px] font-mono text-slate-300">
              <Cpu className="w-2.5 h-2.5 text-amber-400" />
              <span>DRAM: {bufferSizeMB.toFixed(1)} / 64 MB</span>
            </div>
            <div className="w-20 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-300"
                style={{ width: `${(bufferSizeMB / 64) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recording Active Stopwatch Center Top Badge */}
        {isRecording && (
          <div className="absolute top-12 inset-x-0 flex justify-center z-20 pointer-events-none">
            <div className="bg-red-600/90 text-white font-mono text-xs font-extrabold px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-lg border border-red-400 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>REC [{formatTime(recordingSeconds)}]</span>
            </div>
          </div>
        )}
      </div>

      {/* LIVE AI PIPELINE STATUS CHIP ROW */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-900/95 p-1.5 rounded-xl border border-slate-800 text-[9px] font-mono text-center">
        <div className="bg-slate-950/80 p-1 rounded border border-blue-900/60 text-blue-300 truncate">
          🎙️ Whisper: <strong className="text-white font-normal">Active</strong>
        </div>
        <div className="bg-slate-950/80 p-1 rounded border border-cyan-900/60 text-cyan-300 truncate">
          👤 YOLO: <strong className="text-white font-normal">{autoRedactBystanders ? 'Redacting' : 'Off'}</strong>
        </div>
        <div className="bg-slate-950/80 p-1 rounded border border-emerald-900/60 text-emerald-300 truncate">
          💾 RAM: <strong className="text-white font-normal">Volatile</strong>
        </div>
      </div>

      {/* AUTHENTIC NATIVE SMARTPHONE CAMERA APP CONTROLS CONTAINER */}
      <div className="bg-slate-950 text-white p-4 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        {/* Camera Mode Selector Ribbon */}
        <div className="flex items-center justify-center space-x-6 text-[11px] font-bold tracking-wider uppercase font-mono">
          <button
            onClick={() => setActiveCameraMode('audio')}
            className={`transition-colors cursor-pointer ${
              activeCameraMode === 'audio' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            AUDIO
          </button>
          <button
            onClick={() => setActiveCameraMode('video')}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${
              activeCameraMode === 'video' ? 'text-amber-400 font-extrabold' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>VIDEO (RAM)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          </button>
          <button
            onClick={() => setActiveCameraMode('snap')}
            className={`transition-colors cursor-pointer ${
              activeCameraMode === 'snap' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            BURST SNAP
          </button>
        </div>

        {/* NATIVE CAMERA SHUTTER & ACTION DOCK */}
        <div className="flex items-center justify-between px-2 pt-1">
          {/* LEFT: EMERGENCY BURN BUTTON (MILITARY RED TRIGGER) */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleBurn}
              className="w-12 h-12 rounded-full bg-red-600/20 hover:bg-red-600/30 active:scale-95 border-2 border-red-500 text-red-400 flex items-center justify-center transition-all shadow-md cursor-pointer group"
              title="Emergency BURN: Instant DRAM purge (Zero forensic residue)"
            >
              <Flame className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-[9px] font-mono font-bold text-red-400 uppercase mt-1">
              BURN
            </span>
          </div>

          {/* CENTER: NATIVE CAMERA SHUTTER BUTTON WITH CONCENTRIC RINGS & SMOOTH MORPH */}
          <div className="relative flex items-center justify-center">
            {/* Outer Pulsing Glow when recording */}
            {isRecording && (
              <div className="absolute -inset-3 rounded-full bg-red-500/25 animate-ping pointer-events-none"></div>
            )}

            {/* Outer Thick White Camera Shutter Bezel */}
            <div className="w-20 h-20 rounded-full border-[4px] border-white/90 flex items-center justify-center p-1.5 bg-transparent shadow-lg transition-transform active:scale-95">
              {/* Inner Red Core (Pill/Circle to Rounded Square Morph) */}
              <button
                onClick={handleRecordToggle}
                className={`w-full h-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                  isRecording
                    ? 'rounded-xl bg-red-600 ring-4 ring-red-400/40 transform scale-75'
                    : 'rounded-full bg-red-600 hover:bg-red-500 active:scale-90 ring-2 ring-red-700/50'
                }`}
                title={isRecording ? "Stop Video Recording" : "Start Video Recording"}
              >
                {/* Native recording symbol indicator */}
                {isRecording ? (
                  <div className="w-4 h-4 rounded-xs bg-white"></div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-red-400/40"></div>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: SEAL PAYLOAD / GENERATE BSA CERTIFICATE */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleSealAndProceed}
              className="w-12 h-12 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 active:scale-95 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center transition-all shadow-md cursor-pointer group"
              title="Seal evidence payload & generate BSA Sec 63 certificate"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase mt-1">
              SEAL
            </span>
          </div>
        </div>

        {/* Bottom Shutter Instructional Subtext */}
        <p className="text-center text-[10px] text-slate-400 font-mono pt-1">
          {isRecording 
            ? '● RECORDING IN PROGRESS — TAP SHUTTER TO STOP' 
            : 'TAP CENTER SHUTTER TO RECORD VOLATILE DRAM PAYLOAD'}
        </p>
      </div>
    </div>
  );
};
