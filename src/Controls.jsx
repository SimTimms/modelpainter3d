import pan from './assets/gestures/pan.png';
import rotate from './assets/gestures/rotate.png';
import zoom from './assets/gestures/zoom.png';
import paint from './assets/gestures/paint.png';

export function Controls() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        left: 0,
        flexDirection: 'column',
        fontSize: 10,
        padding: 10,
        color: 'rgba(255,255,255,0.5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          fontSize: 10,
          padding: 10,
        }}
      >
        <img
          src={paint}
          style={{ width: 42, borderRadius: 10, marginRight: 10 }}
        />
        PAINT
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          fontSize: 10,
          padding: 10,
        }}
      >
        <img
          src={pan}
          style={{ width: 42, borderRadius: 10, marginRight: 10 }}
        />
        PAN
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: 10,
          fontSize: 10,
        }}
      >
        <img
          src={zoom}
          style={{ width: 42, borderRadius: 10, marginRight: 10 }}
        />
        ZOOM
      </div>{' '}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: 10,
          fontSize: 10,
        }}
      >
        <img
          src={rotate}
          style={{ width: 42, borderRadius: 10, marginRight: 10 }}
        />
        ROTATE
      </div>
    </div>
  );
}
