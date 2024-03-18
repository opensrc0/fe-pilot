import React from 'react';

function VoiceRecognitionIcon({ children, listen }) {
  return React.Children.map(children || 'Voice Recognition', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: listen,
  }));
}

export default VoiceRecognitionIcon;
