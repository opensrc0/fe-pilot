import React from 'react';

function FaceDetector({
  toggleFlash,
  children,
  zIndex,
  top,
  bottom,
  left,
  right,
  color,
  position,
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

FaceDetector.propTypes = {

};

FaceDetector.defaultProps = {
  color: 'white',
  top: 'auto',
  bottom: '50%',
  left: 'auto',
  right: '5%',
  position: 'absolute',
};

export default FaceDetector;
