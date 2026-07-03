import { useEffect } from 'react';
import ThreeD from './ThreeD';

export default function LandingScreen() {
  useEffect(() => {
    const bootFallback = document.getElementById('boot-fallback');
    if (bootFallback) {
      bootFallback.style.transition = 'opacity 150ms ease';
      bootFallback.style.opacity = '0';
      window.setTimeout(() => {
        bootFallback.remove();
      }, 170);
    }
  }, []);

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
      <ThreeD isVisible={true} />
    </div>
  );
}
