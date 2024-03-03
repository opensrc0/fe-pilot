import React from 'react';

function Close({ zIndex, onClose }) {
  return (
    <div
      style={{
        left: '5%',
        bottom: '25%',
        zIndex,
        position: 'absolute',
        cursor: 'pointer',
        color: 'white',
      }}
      onClick={onClose}
      onKeyDown={(ev) => ev.key === 'Enter' && onClose()}
      role="button"
      tabIndex={0}
    >
      Close Button
    </div>
  );
}

Close.propTypes = {

};

Close.defaultProps = {

};

export default Close;
