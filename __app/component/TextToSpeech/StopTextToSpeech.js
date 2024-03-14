import React from 'react';

function StopTextToSpeech({ children, onClick }) {
  return React.Children.map(children || 'Stop', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick,
  }));
}

export default StopTextToSpeech;
