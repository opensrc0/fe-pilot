import React from 'react';

function TextToSpeechStart({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  children,
  isAudioOn,
  textToSpeechStart,
  setIsAudioOn,
  text,
}) {
  return !isAudioOn && React.Children.map(children || 'Start', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => textToSpeechStart({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      setIsAudioOn,
      text,
    }),
    type: 'ttsStart',
  }));
}

export { TextToSpeechStart };

export default TextToSpeechStart;
