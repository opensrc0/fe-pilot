import React from 'react';

function VoiceRecognitionIcon({ children, onClick }) {
  return React.Children.map(children || 'Voice Recognition', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick,
  }));
}

export default VoiceRecognitionIcon;
