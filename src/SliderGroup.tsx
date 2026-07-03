import Slider from 'rc-slider';

interface SliderGroupProps {
  title: string;
  min: number;
  max: number;
  value: number;
  change: (value: number) => void;
  i: number;
  squadIndex: number;
  width?: number | string;
  roundHandle?: boolean;
  titleFontSize?: number | string;
  titleColor?: string;
}
  
export function SliderGroup({
  title,
  min,
  max,
  value,
  change,
  i,
  squadIndex,
  width,
  roundHandle = false,
  titleFontSize,
  titleColor,
}: SliderGroupProps ) {
  return (
    <div
      style={{
        maxWidth: 300,
        width: width ?? '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        color: '#9bc1a0',
        flexDirection: 'column',
        marginTop: 4,
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontSize: titleFontSize ?? '0.6rem',
          color: titleColor ?? '#777',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </span>
      <Slider
        min={min}
        max={max}
        value={value}
        step={i ? i : 0.01}
        onChange={(value) =>
          change(Array.isArray(value) ? value[0] : value)
        }
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
          borderRadius: roundHandle ? '50%' : 0,
          width: roundHandle ? 14 : 20,
          height: roundHandle ? 14 : 11,
          marginTop: roundHandle ? -4.5 : -3,
          opacity: 1,
        }}
      />
    </div>
  );
}
