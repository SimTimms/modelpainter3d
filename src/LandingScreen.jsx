import React, { useState, useEffect } from 'react';
import ThreeD from './ThreeD';
import IntroScreen from './IntroScreen';

export default function LandingScreen() {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #222 0%, #000 100%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        flexDirection: 'column',
      }}
    >
      {!hasLoaded && <IntroScreen setHasLoaded={setHasLoaded} />}
      <ThreeD isVisible={hasLoaded} />
    </div>
  );
}
