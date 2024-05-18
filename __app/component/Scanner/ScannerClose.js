import React from 'react';

function ScannerClose({
  zIndex,
  allClear,
  color = 'white',
  top = 'auto',
  bottom = '25%',
  left = 'auto',
  right = '72%',
  position = 'absolute',

  onClose = () => {},
  children,
}) {
  const setClose = () => {
    onClose();
    allClear();
  };

  return (
    <div
      id="fe-pilot-scanner-close"
      style={{
        top,
        bottom,
        left,
        right,
        zIndex,
        color,
        position,
      }}
      onClick={setClose}
      onKeyDown={(ev) => ev.key === 'Enter' && setClose()}
      role="button"
      tabIndex={0}
    >
      {children || 'Close Button'}
    </div>
  );
}

export { ScannerClose };

export default ScannerClose;
