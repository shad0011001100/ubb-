import React from 'react';
import { Composition } from 'remotion';
import { WalkthroughComposition } from './WalkthroughComposition';

export const Root: React.FC = () => {
  return (
    <>
      {/* 9:16 Vertical Mobile Video for Pitch / Presentation (1080x1920) */}
      <Composition
        id="WalkthroughComposition"
        component={WalkthroughComposition}
        durationInFrames={675}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 16:9 Landscape Evaluator Presentation (1920x1080) */}
      <Composition
        id="WalkthroughLandscape"
        component={WalkthroughComposition}
        durationInFrames={675}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
