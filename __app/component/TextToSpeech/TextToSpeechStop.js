import React from 'react';

function TextToSpeechStop({ children, handleStop, isAudioOn }) {
  return isAudioOn && React.Children.map(children || 'Stop', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: handleStop,
    type: 'ttsStop',
  }));
}

export default TextToSpeechStop;
