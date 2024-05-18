import React from 'react';

function ScannerFlash({
  zIndex = 9,
  toggleFlash,
  color = 'white',
  top = 'auto',
  bottom = '25%',
  left = 'auto',
  right = '5%',
  position = 'absolute',
  children,
}) {
  return (
    <div
      id="fe-pilot-scanner-flash"
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

export { ScannerFlash };

export default ScannerFlash;
