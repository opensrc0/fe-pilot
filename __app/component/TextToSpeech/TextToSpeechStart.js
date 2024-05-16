import React from 'react';

function WTextToSpeechStart({
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
  defaultShow = false,
}) {
  return (!isAudioOn || defaultShow) && React.Children.map(children || 'Start', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
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

export { WTextToSpeechStart as TextToSpeechStart };

export default WTextToSpeechStart;
