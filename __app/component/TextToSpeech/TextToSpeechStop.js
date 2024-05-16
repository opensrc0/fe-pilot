import React from 'react';

function WTextToSpeechStop({ children, isAudioOn, textToSpeechStop, setIsAudioOn }) {
  return isAudioOn && React.Children.map(children || 'Stop', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => textToSpeechStop({
      setIsAudioOn,
    }),
    type: 'ttsStop',
  }));
}

export { WTextToSpeechStop as TextToSpeechStop };

export default WTextToSpeechStop;
