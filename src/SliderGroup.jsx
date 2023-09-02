import Slider from 'rc-slider';

export function SliderGroup({ title, min, max, value, change, i, squadIndex }) {
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
      <span style={{ fontSize: '0.6rem', color: '#777', whiteSpace: 'nowrap' }}>
        {title}
      </span>
      <Slider
        min={min}
        max={max}
        value={value}
        step={i ? i : 0.01}
        onChange={(value) => change(value)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          height: 10,
          marginBottom: 5,
        }}
        trackStyle={{
          backgroundColor: '#aaa',
          borderRadius: 0,
          height: 5,
        }}
        railStyle={{
          backgroundColor: '#444  ',
          borderRadius: 0,
          height: 5,
        }}
        handleStyle={{
          background: '#fff',
          border: `none`,
          boxShadow: `0 0 5px rgba(0,0,0,0.3)`,
          borderRadius: 0,
          width: 20,
          height: 11,
          marginTop: -3,
          opacity: 1,
        }}
      />
    </div>
  );
}
