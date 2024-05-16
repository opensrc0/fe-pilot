import React from 'react';

function TextToSpeechStop({ children, isAudioOn, textToSpeechStop, setIsAudioOn }) {
  return isAudioOn && React.Children.map(children || 'Stop', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => textToSpeechStop({
      setIsAudioOn,
    }),
    type: 'ttsStop',
  }));
}

export { TextToSpeechStop };

export default TextToSpeechStop;
