import React from 'react';

function VoiceRecognitionModal({
  children,
  setIsModalVisible,
  isModalVisible,
  isVoiceStarted,
  voiceText,
}) {
  let isReactElement = true;
  return isModalVisible && React.Children.map(children, (child) => {
    isReactElement = child.type && child.type?.[0] === child.type?.[0]?.toUpperCase();
    return React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClose: () => setIsModalVisible(false),
      [isReactElement ? 'voiceText' : 'voicetext']: voiceText,
      [isReactElement ? 'isVoiceStarted' : 'isvoicestarted']: isVoiceStarted.toString(),
    });
  });
}

export { VoiceRecognitionModal };

export default VoiceRecognitionModal;
