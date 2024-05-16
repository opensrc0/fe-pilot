import React from 'react';

function WVoiceRecognitionIcon({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  children,
  voiceRecognition,
  setIsModalVisible,
  setIsVoiceStarted,
  setVoiceText,
}) {
  return React.Children.map(children || 'Voice Recognition', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => voiceRecognition({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      setIsModalVisible,
      setIsVoiceStarted,
      setVoiceText,
    }),
  }));
}

export { WVoiceRecognitionIcon as VoiceRecognitionIcon };

export default WVoiceRecognitionIcon;
