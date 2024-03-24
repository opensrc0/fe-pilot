import React from 'react';

function ScannerClose({
  onClose,
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
      onClick={onClose}
      onKeyDown={(ev) => ev.key === 'Enter' && onClose()}
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
};

export default ScannerClose;
