import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile
} from 'remotion';
import { ScreenData } from './types';

interface ScreenSlideProps {
  screen: ScreenData;
  index: number;
  totalScreens: number;
}

export const ScreenSlide: React.FC<ScreenSlideProps> = ({
  screen,
  index,
  totalScreens
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
      mass: 0.8
    }
  });

  // Scale / Subtle zoom effect
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const opacity = interpolate(entrance, [0, 0.4, 1], [0, 0.9, 1]);

  // Card slide up
  const translateY = interpolate(entrance, [0, 1], [40, 0]);

  // Text entrance (delayed)
  const textEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 15, stiffness: 100 }
  });
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);
  const textTranslateY = interpolate(textEntrance, [0, 1], [20, 0]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0D1B1D',
        backgroundImage:
          'radial-gradient(circle at 15% 10%, rgba(78,124,99,0.22), transparent 50%), radial-gradient(circle at 85% 90%, rgba(227,160,111,0.15), transparent 45%)',
        color: '#F5F5F0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 40px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: '#14282B',
              border: '1px solid rgba(227,160,111,0.3)',
              color: '#E3A06F',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            Ubb Walkthrough
          </div>
          <span style={{ fontSize: '14px', color: '#9f8d83' }}>
            Step {index + 1} of {totalScreens}
          </span>
        </div>

        {/* Brand Tag */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#E3A06F',
            letterSpacing: '0.05em'
          }}
        >
          Zero-PII · Safe Sanctuary
        </div>
      </div>

      {/* Center Showcase Phone Mockup with Screenshot */}
      <div
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
          position: 'relative'
        }}
      >
        {/* Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            width: '380px',
            height: '680px',
            borderRadius: '48px',
            background: 'radial-gradient(circle, rgba(227,160,111,0.2) 0%, rgba(78,124,99,0.1) 60%, transparent 80%)',
            filter: 'blur(30px)',
            zIndex: 0
          }}
        />

        {/* Mobile Device Mockup Frame */}
        <div
          style={{
            width: '360px',
            height: '660px',
            backgroundColor: '#14282B',
            borderRadius: '40px',
            border: '8px solid #0C1A1C',
            boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1
          }}
        >
          {/* Top Notch */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90px',
              height: '18px',
              backgroundColor: '#0C1A1C',
              borderRadius: '0 0 12px 12px',
              zIndex: 20
            }}
          />

          {/* Screenshot Image */}
          <Img
            src={staticFile(screen.imagePath)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top'
            }}
          />
        </div>
      </div>

      {/* Bottom Context & Feature Title Card */}
      <div
        style={{
          transform: `translateY(${textTranslateY}px)`,
          opacity: textOpacity,
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#14282B',
          border: '1px solid rgba(227,160,111,0.25)',
          borderRadius: '24px',
          padding: '20px 28px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          zIndex: 10
        }}
      >
        <div
          style={{
            color: '#E3A06F',
            fontSize: '12px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '6px',
            fontWeight: 600
          }}
        >
          {screen.badge || 'Feature Spotlight'}
        </div>
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#F5F5F0',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em'
          }}
        >
          {screen.title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: '#D6E2DC',
            margin: 0,
            lineHeight: 1.45
          }}
        >
          {screen.description}
        </p>
      </div>
    </div>
  );
};
