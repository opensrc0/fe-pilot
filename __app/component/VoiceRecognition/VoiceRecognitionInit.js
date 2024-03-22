import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import { handleSuccess, handleError } from '../services/handlerService';

function VoiceRecognition({
  disbaleToast,
  successCb,
  successMsg,
  failureCb,
  failureMsg,
  children,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVoiceStarted, setIsVoiceStarted] = useState(false);
  const [voiceText, setVoiceText] = useState('');

  const listen = () => {
    if (VoiceRecognition.isBrowserSupport()) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setVoiceText(text);
        if (event.results[0].isFinal) {
          setTimeout(() => {
            handleSuccess({ disbaleToast, msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: text });
            setIsModalVisible(false);
            setVoiceText('');
          }, 1500);
        }
      };
      recognition.start();
      recognition.onsoundstart = () => {
        setIsVoiceStarted(true);
      };
      recognition.onsoundend = () => {
        setIsVoiceStarted(false);
      };
      recognition.onerror = () => {
        setIsModalVisible(false);
        return handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error, failureCb });
      };
      recognition.onend = () => {
        recognition.abort();
        recognition.onresult = () => {};
        recognition.stop();
        setTimeout(() => setIsModalVisible(false), 1500);
      };
      setIsModalVisible(true);
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return true;
  };

  return React.Children.map(children, (child) => React.cloneElement(child, {
    listen,
    isVoiceStarted,
    isModalVisible,
    voiceText,
    onClose: () => setIsModalVisible(false),
    disbaleToast,
    successCb,
    successMsg,
    failureCb,
    failureMsg,
  }));
}

VoiceRecognition.isBrowserSupport = () => window.SpeechRecognition
  || window.webkitSpeechRecognition;

VoiceRecognition.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

VoiceRecognition.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: 'Successfully converted your voice to text',
  failureMsg: {
    unSupported: 'Voice Recognition feature is not supporting in your device',
    error: 'Unable to convert your voice to text',
  },
};

export default Wrapper(VoiceRecognition);
