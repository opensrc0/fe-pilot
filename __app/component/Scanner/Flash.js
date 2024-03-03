import React from 'react';

function Flash({ zIndex, toggleFlash }) {
  return (
    <div
      style={{
        right: '5%',
        bottom: '25%',
        zIndex,
        position: 'absolute',
        color: 'white',
      }}
      onClick={toggleFlash}
      onKeyDown={(ev) => ev.key === 'Enter' && toggleFlash()}
      role="button"
      tabIndex={0}
    >
      Toggle Flash
    </div>
  );
}

Flash.propTypes = {

};

Flash.defaultProps = {

};

export default Flash;
