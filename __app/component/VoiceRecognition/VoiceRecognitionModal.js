import React from 'react';

export default function VoiceRecognitionModal({
  children,
  isModalVisible,
  isVoiceStarted,
  onClose,
  voiceText,
}) {
  let isReactElement = true;
  return isModalVisible && React.Children.map(children, (child) => {
    isReactElement = child.type[0] === child.type[0].toUpperCase();
    return React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClose,
      [isReactElement ? 'voiceText' : 'voicetext']: voiceText,
      [isReactElement ? 'isVoiceStarted' : 'isvoicestarted']: isVoiceStarted.toString(),
    });
  });
}
