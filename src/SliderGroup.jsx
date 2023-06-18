import Slider from 'rc-slider';

export function SliderGroup({ title, min, max, value, change }) {
  return (
    <div
      style={{
        maxWidth: 300,
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#9bc1a0',
        flexDirection: 'column',
        marginTop: 4,
      }}
    >
      {title}
      <Slider
        min={min}
        max={max}
        value={value}
        step={0.01}
        onChange={(value) => change(value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          height: 10,
          marginTop: 10,
        }}
        trackStyle={{
          backgroundColor: '#6fe861',
          borderRadius: 0,
          height: 5,
        }}
        railStyle={{
          backgroundColor: '#061c10',
          borderRadius: 0,
          height: 5,
        }}
        handleStyle={{
          background: '#fff55a',
          border: `none`,
          boxShadow: `0 0 5px rgba(0,0,0,0.3)`,
          borderRadius: 0,
          width: 20,
          height: 5,
          marginTop: 0,
        }}
      />
    </div>
  );
}
