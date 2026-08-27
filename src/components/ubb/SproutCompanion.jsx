import React from 'react';

/**
 * SproutCompanion Component (ऊब)
 * Highly expressive, zero-dependency SVG emotional companion.
 * 
 * Props:
 * - emotion: 'greeting' | 'listening' | 'cozy' | 'breathing' | 'joy' | 'night'
 * - message: string (optional speech text)
 * - size: 'sm' (100px) | 'md' (140px) | 'lg' (180px)
 * - showSpeech: boolean (default true)
 */
export function SproutCompanion({
  emotion = 'greeting',
  message,
  size = 'md',
  showSpeech = true,
  className = ''
}) {
  const defaultMessages = {
    greeting: 'Hello! Take your time today.',
    listening: 'I am listening with an open heart.',
    cozy: 'It is completely okay to rest.',
    breathing: 'Breathe in slowly with me...',
    night: 'Rest is an essential part of the work.',
    joy: '✨ Milestone reached! You did great.'
  };

  const currentMessage = message || defaultMessages[emotion] || defaultMessages.greeting;

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36'
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Dynamic Speech Dialogue Bubble */}
      {showSpeech && (
        <div className="bg-white border border-[#c5c8bc]/70 text-[#1a1d14] text-[11px] font-bold px-3 py-1.5 rounded-2xl shadow-xs mb-2 text-center max-w-[260px] animate-fadeIn leading-tight relative">
          <span>"{currentMessage}"</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#c5c8bc]/70 rotate-45" />
        </div>
      )}

      {/* SVG Mascot with Emotion Morphs */}
      <div className={`relative flex items-center justify-center ${sizeClasses[size] || sizeClasses.md}`}>
        <svg
          className={`w-full h-full object-contain ${
            emotion === 'greeting'
              ? 'animate-bounce-subtle'
              : emotion === 'breathing'
              ? 'animate-pulse-slow'
              : emotion === 'joy'
              ? 'animate-bounce'
              : ''
          }`}
          viewBox="0 0 200 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ambient Background Aura */}
          <circle
            cx="100"
            cy="120"
            r="75"
            fill={emotion === 'breathing' ? 'rgba(227, 160, 111, 0.35)' : 'rgba(82, 97, 64, 0.2)'}
            filter="blur(20px)"
          />

          {/* Leaf Sprout on Head */}
          <g transform={`translate(100, 48) ${emotion === 'listening' ? 'rotate(-8)' : ''}`}>
            <path d="M 0 0 C -15 -22, -22 -38, 0 -45 C 22 -38, 15 -22, 0 0 Z" fill="#526140" />
            <path d="M 0 -6 C -10 -20, -12 -30, 0 -40" stroke="#7BA867" stroke-width="2" stroke-linecap="round" />
            <circle cx="0" cy="-45" r="3.5" fill="#E3A06F" />
          </g>

          {/* Main Chubby Pebble Body */}
          <path d="M 50 115 C 50 70, 150 70, 150 115 C 150 160, 138 175, 100 175 C 62 175, 50 160, 50 115 Z" fill="#F5F5F0" />
          <path d="M 66 125 C 66 98, 134 98, 134 125 C 134 156, 124 165, 100 165 C 76 165, 66 156, 66 125 Z" fill="#E8EADB" />

          {/* Cozy Woolen Scarf (When Cozy or Listening) */}
          {(emotion === 'cozy' || emotion === 'night') && (
            <g>
              <path d="M 54 120 C 72 135, 128 135, 146 120 C 152 132, 140 142, 100 142 C 60 142, 48 132, 54 120 Z" fill="#815505" />
              <path d="M 120 132 L 130 168 L 114 168 Z" fill="#6A4604" />
            </g>
          )}

          {/* EYES MORPHS */}
          {emotion === 'joy' ? (
            // Golden Star Sparkle Eyes
            <g>
              <polygon points="80,90 82,95 87,97 82,99 80,104 78,99 73,97 78,95" fill="#E3A06F" />
              <polygon points="120,90 122,95 127,97 122,99 120,104 118,99 113,97 118,95" fill="#E3A06F" />
            </g>
          ) : emotion === 'cozy' || emotion === 'night' ? (
            // Cozy Crescent Eyes
            <g>
              <path d="M 74 98 Q 80 91 86 98" stroke="#14282B" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 114 98 Q 120 91 126 98" stroke="#14282B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          ) : emotion === 'breathing' ? (
            // Peaceful Downward Curves
            <g>
              <path d="M 74 97 Q 80 102 86 97" stroke="#526140" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 114 97 Q 120 102 126 97" stroke="#526140" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            // Normal Big Sparkle Eyes
            <g>
              <ellipse cx="80" cy="98" rx="5.5" ry="7.5" fill="#14282B" />
              <circle cx="78" cy="95" r="2.3" fill="#FFFFFF" />
              <circle cx="82" cy="101" r="1.2" fill="#FFFFFF" />

              <ellipse cx="120" cy="98" rx="5.5" ry="7.5" fill="#14282B" />
              <circle cx="118" cy="95" r="2.3" fill="#FFFFFF" />
              <circle cx="122" cy="101" r="1.2" fill="#FFFFFF" />
            </g>
          )}

          {/* Rosy Blush Cheeks */}
          <circle cx="68" cy="107" r="6" fill="#E3A06F" opacity="0.65" />
          <circle cx="132" cy="107" r="6" fill="#E3A06F" opacity="0.65" />

          {/* MOUTH MORPHS */}
          {emotion === 'breathing' ? (
            <ellipse cx="100" cy="111" rx="4" ry="5" fill="#14282B" />
          ) : emotion === 'joy' ? (
            <path d="M 92 108 Q 100 120 108 108 Z" fill="#BA1A1A" stroke="#14282B" strokeWidth="2" />
          ) : (
            <path d="M 94 109 Q 100 115 106 109" stroke="#14282B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}

          {/* Right Arm Holding Lantern Emblem */}
          <g transform={emotion === 'joy' ? 'translate(0, -15)' : ''}>
            <path d="M 140 120 Q 158 122 165 130" stroke="#F5F5F0" strokeWidth="8" strokeLinecap="round" fill="none" />
            <line x1="165" y1="130" x2="165" y2="142" stroke="#815505" strokeWidth="2.5" />
            <rect x="153" y="142" width="24" height="30" rx="5" fill="#14282B" stroke="#E3A06F" strokeWidth="2" />
            <circle cx="165" cy="157" r="9" fill="#E3A06F" />
            <path d="M 161 156 A 2.5 2.5 0 0 1 165 153 A 2.5 2.5 0 0 1 169 156 Q 169 160 165 163 Q 161 160 161 156 Z" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    </div>
  );
}
