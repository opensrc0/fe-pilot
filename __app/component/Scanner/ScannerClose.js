import React from 'react';

function ScannerClose({
  onClose,
  children,
  zIndex,
  allClear,
  top,
  bottom,
  left,
  right,
  color,
  position,
}) {
  const setClose = () => {
    onClose();
    allClear();
  };

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
      onClick={setClose}
      onKeyDown={(ev) => ev.key === 'Enter' && setClose()}
      role="button"
      tabIndex={0}
    >
      {children || 'Close Button'}
    </div>
  );
}

ScannerClose.propTypes = {

};

ScannerClose.defaultProps = {
  color: 'white',
  top: 'auto',
  bottom: '25%',
  left: 'auto',
  right: '72%',
  position: 'absolute',
  onClose: () => {},
};

export { ScannerClose };

export default ScannerClose;
