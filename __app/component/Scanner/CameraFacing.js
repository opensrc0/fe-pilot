import React from 'react';

function CameraFacing({
  toggleCamera,
  children,
  zIndex,
  top,
  bottom,
  left,
  right,
  color,
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
        position: 'absolute',
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

CameraFacing.propTypes = {

};

CameraFacing.defaultProps = {
  color: 'white',
  top: 'auto',
  bottom: '25%',
  left: 'auto',
  right: '37%',
};

export default CameraFacing;
