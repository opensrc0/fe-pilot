import React from 'react';

function FaceDetectorClose({
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

FaceDetectorClose.propTypes = {

};

FaceDetectorClose.defaultProps = {
  color: 'white',
  top: 'auto',
  bottom: '50%',
  left: 'auto',
  right: '72%',
  position: 'absolute',
};

export default FaceDetectorClose;
