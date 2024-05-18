import React from 'react';

function FaceDetectorFacing({
  toggleCamera,
  children,
  zIndex,
  color = 'white',
  top = 'auto',
  bottom = '50%',
  left = 'auto',
  right = '37%',
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
      onClick={toggleCamera}
      onKeyDown={(ev) => ev.key === 'Enter' && toggleCamera()}
      role="button"
      tabIndex={0}
    >
      {children || 'Toggle Camera'}
    </div>
  );
}

export default FaceDetectorFacing;
