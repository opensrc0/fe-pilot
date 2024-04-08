import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';

const failureMsgDefault = {
  unSupported: 'Voice Recognition feature is not supporting in your device',
  error: 'Unable to convert your voice to text',
};

function VoiceRecognition({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg: failureMsgProps,
  children,
}) {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVoiceStarted, setIsVoiceStarted] = useState(false);
  const [voiceText, setVoiceText] = useState('');

  const listen = () => {
    if (VoiceRecognition.isBrowserSupport()) {
      handleLoading({ loadingCb });

      const SpeechRecognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
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
            handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: text });
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
        return handleError({ msgType: 'ERROR', msg: failureMsg.error, failureCb });
      };
      recognition.onend = () => {
        recognition.abort();
        recognition.onresult = () => {};
        recognition.stop();
        setTimeout(() => setIsModalVisible(false), 1500);
      };
      setIsModalVisible(true);
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return true;
  };

  return React.Children.map(children, (child) => React.cloneElement(child, {
    successCb,
    successMsg,
    failureCb,
    failureMsg,
    listen,
    isVoiceStarted,
    isModalVisible,
    voiceText,
    onClose: () => setIsModalVisible(false),

  }));
}

VoiceRecognition.isBrowserSupport = () => globalThis.SpeechRecognition
  || globalThis.webkitSpeechRecognition;

VoiceRecognition.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

VoiceRecognition.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'Successfully converted your voice to text',
  failureMsg: { ...failureMsgDefault },
};

export default Wrapper(VoiceRecognition);
