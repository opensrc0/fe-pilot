import React from 'react';

function StartTextToSpeech({ children, onClick }) {
  return React.Children.map(children || 'Start', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick,
  }));
}

export default StartTextToSpeech;
