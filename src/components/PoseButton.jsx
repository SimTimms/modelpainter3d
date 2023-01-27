import React from 'react';

export const PoseButton = ({ pose, onClickEvent }) => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: '#ee9cff',
        backgroundImage: `url(${pose})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        border: '1px solid #fff',
        boxShadow:
          '0 0 5px rgba(0,0,0,0.2), inset -4px -4px 4px rgba(0,0,0,0.3), inset 4px 4px 4px rgba(255,255,255,0.3)',
        cursor: 'pointer',
      }}
      onClick={() => onClickEvent()}
    ></div>
  );
};
