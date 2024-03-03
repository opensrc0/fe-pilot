import React from 'react';

function Flash({
  toggleFlash,
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
      onClick={toggleFlash}
      onKeyDown={(ev) => ev.key === 'Enter' && toggleFlash()}
      role="button"
      tabIndex={0}
    >
      {children || 'Toggle Flash'}
    </div>
  );
}

Flash.propTypes = {

};

Flash.defaultProps = {
  color: 'white',
  top: 'auto',
  bottom: '25%',
  left: 'auto',
  right: '5%',
};

export default Flash;
