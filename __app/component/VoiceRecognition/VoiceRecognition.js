import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';
import VoiceRecognitionIcon from './VoiceRecognitionIcon';

const failureMsgDefault = {
  unSupported: 'VoiceRecognition is not supporting in your device',
  error: '',
};

const isBrowserSupport = () => globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

const voiceRecognition = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Successfully converted your voice to text!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },

  setIsModalVisible = () => {},
  setIsVoiceStarted = () => {},
  setVoiceText = () => {},
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
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
      recognition.onerror = (event) => {
        setIsModalVisible(false);
        return handleError({ msgType: 'ERROR', msg: failureMsg.error || event?.error || 'Unable to convert your voice to text', failureCb });
      };
      recognition.onend = () => {
        recognition.abort();
        recognition.onresult = () => {};
        recognition.stop();
        setTimeout(() => setIsModalVisible(false), 1500);
      };
      setIsModalVisible(true);
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function VoiceRecognition({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVoiceStarted, setIsVoiceStarted] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  return React.Children.map(children || <VoiceRecognitionIcon />, (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    successCb,
    failureCb,
    loadingCb,
    successMsg,
    failureMsg,

    voiceRecognition,

    isModalVisible,
    isVoiceStarted,
    voiceText,
    setIsModalVisible,
    setIsVoiceStarted,
    setVoiceText,

    ...props,
  }));
}

VoiceRecognition.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const WVoiceRecognition = Wrapper(VoiceRecognition, isBrowserSupport);

export { voiceRecognition, WVoiceRecognition as VoiceRecognition };

export default WVoiceRecognition;
