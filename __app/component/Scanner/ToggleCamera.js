import React from 'react';

function ToggleCamera({
  zIndex,
  toggleCamera,
  children,
}) {
  return (
    <div
      style={{
        left: '38%',
        bottom: '25%',
        zIndex,
        position: 'absolute',
        cursor: 'pointer',
        color: 'white',
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

ToggleCamera.propTypes = {

};

ToggleCamera.defaultProps = {

};

export default ToggleCamera;
