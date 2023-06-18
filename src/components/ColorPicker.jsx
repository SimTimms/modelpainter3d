import React from 'react';
import { TwitterPicker } from 'react-color';

export const ColorPicker = ({ skin, setSkin, title, colors }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          border: '1px solid #fff',
          boxShadow:
            '0 0 5px rgba(0,0,0,0.2), inset -4px -4px 4px rgba(0,0,0,0.3), inset 4px 4px 4px rgba(255,255,255,0.3)',
          cursor: 'pointer',
        }}
      >
        {title}
      </button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 100,
            background: 'rgba(0,0,0,0.5)',
            overflow: 'auto',
          }}
          onClick={() => setIsOpen(false)}
        >
          <TwitterPicker
            color={skin}
            onChange={(color, e) => setSkin(color.hex)}
            triangle="hide"
            colors={colors}
          />
        </div>
      )}
    </div>
  );
};
