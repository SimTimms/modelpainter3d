import ThreeD from './ThreeD';

export default function LandingScreen() {

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
