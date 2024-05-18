import React from 'react';

function ScannerFacing({
  toggleCamera,
  children,
  zIndex = 9,
  color = 'white',
  top = 'auto',
  bottom = '25%',
  left = 'auto',
  right = '37%',
  position = 'absolute',
}) {
  return (
    <div
      id="fe-pilot-scanner-facing"
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

export { ScannerFacing };

export default ScannerFacing;
