import React from 'react';

function Close({
  onClose,
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
      onClick={onClose}
      onKeyDown={(ev) => ev.key === 'Enter' && onClose()}
      role="button"
      tabIndex={0}
    >
      {children || 'Close Button'}
    </div>
  );
}

Close.propTypes = {

};

Close.defaultProps = {
  color: 'white',
  top: 'auto',
  bottom: '25%',
  left: 'auto',
  right: '72%',
};

export default Close;
