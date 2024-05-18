import React from 'react';

function FaceDetector({
  toggleFlash,
  children,
  zIndex,
  color = 'white',
  top = 'auto',
  bottom = '50%',
  left = 'auto',
  right = '5%',
  position = 'absolute',
}) {
  return (
    <div
      style={{
        top,
        bottom,
        left,
        right,
        zIndex,
        color,
        position,
      }}
      onClick={toggleFlash}
      onKeyDown={(ev) => ev.key === 'Enter' && toggleFlash()}
      role="button"
      tabIndex={0}
    >
      {children || 'Toggle Flash'}
    </div>
  );
}

export default FaceDetector;
