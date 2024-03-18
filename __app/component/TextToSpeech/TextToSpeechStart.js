import React from 'react';

function TextToSpeechStart({ children, handlePlay, isAudioOn }) {
  return !isAudioOn && React.Children.map(children || 'Start', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: handlePlay,
    type: 'ttsStart',
  }));
}

export default TextToSpeechStart;
