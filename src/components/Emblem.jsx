import React from 'react';

export const Emblem = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Official Government of India & Ashoka Emblem Vector */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-blue-900 drop-shadow-sm"
        fill="currentColor"
      >
        {/* Ashoka Stambh Stylized Representation */}
        <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="2.5" />
        
        {/* Outer Circular Ring with Ashok Chakra Spokes */}
        <circle cx="50" cy="50" r="41" fill="none" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Three Lions Top Crown */}
        <path
          d="M32 30 C32 20, 42 16, 50 16 C58 16, 68 20, 68 30 C68 36, 64 42, 58 44 L58 48 L42 48 L42 44 C36 42, 32 36, 32 30 Z"
          fill="#1E3A8A"
        />
        {/* Lion Facial Details & Crown definition */}
        <path d="M42 22 C42 18, 46 17, 50 17 C54 17, 58 18, 58 22" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
        <circle cx="45" cy="28" r="1.5" fill="#FFFFFF" />
        <circle cx="55" cy="28" r="1.5" fill="#FFFFFF" />
        <path d="M47 34 Q50 36 53 34" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
        
        {/* Left Side Lion Face Profile */}
        <path d="M34 26 C30 28, 28 32, 28 36 C28 40, 31 43, 35 44" stroke="#1E3A8A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        
        {/* Right Side Lion Face Profile */}
        <path d="M66 26 C70 28, 72 32, 72 36 C72 40, 69 43, 65 44" stroke="#1E3A8A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Abacus (Base) Platform */}
        <rect x="30" y="49" width="40" height="7" rx="1.5" fill="#1E3A8A" />
        <line x1="33" y1="52.5" x2="67" y2="52.5" stroke="#FFFFFF" strokeWidth="0.8" />
        
        {/* Mini Ashoka Chakra in Center Base */}
        <circle cx="50" cy="65" r="8" fill="none" stroke="#1E3A8A" strokeWidth="1.5" />
        <circle cx="50" cy="65" r="2" fill="#1E3A8A" />
        {/* 8 spokes simplified for crisp rendering */}
        <line x1="50" y1="57" x2="50" y2="73" stroke="#1E3A8A" strokeWidth="1" />
        <line x1="42" y1="65" x2="58" y2="65" stroke="#1E3A8A" strokeWidth="1" />
        <line x1="44.3" y1="59.3" x2="55.7" y2="70.7" stroke="#1E3A8A" strokeWidth="1" />
        <line x1="44.3" y1="70.7" x2="55.7" y2="59.3" stroke="#1E3A8A" strokeWidth="1" />

        {/* Guarding Animals on Base (Bull & Horse representations) */}
        <path d="M35 63 C33 63, 31 66, 32 68" stroke="#1E3A8A" strokeWidth="1.5" fill="none" />
        <path d="M65 63 C67 63, 69 66, 68 68" stroke="#1E3A8A" strokeWidth="1.5" fill="none" />

        {/* Pedestal Bottom Plinth */}
        <path d="M26 77 L74 77 L71 82 L29 82 Z" fill="#1E3A8A" />
        <rect x="23" y="82" width="54" height="3" rx="1" fill="#1E3A8A" />

        {/* Satyameva Jayate Devanagari Inscription Indicator */}
        <text
          x="50"
          y="93"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          fill="#1E3A8A"
          letterSpacing="0.5"
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
};

export const PMCLogo = ({ className = "w-9 h-9" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-full h-full rounded-full bg-blue-900 text-white flex flex-col items-center justify-center p-1 border border-blue-950 shadow-sm">
        <span className="text-[7px] font-extrabold tracking-tight leading-none text-orange-400">PMC</span>
        <span className="text-[5.5px] font-bold tracking-tight text-white leading-none mt-0.5">पुणे मनपा</span>
      </div>
    </div>
  );
};
