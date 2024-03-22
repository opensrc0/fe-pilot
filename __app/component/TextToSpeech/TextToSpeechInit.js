import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import textToSpeech from './textToSpeechService';
import { handleSuccess, handleError } from '../services/handlerService';

function TextToSpeechInit({
  disbaleToast,
  successCb,
  successMsg,
  failureCb,
  failureMsg,
  children,
  text,
}) {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const handlePlay = async () => {
    if (TextToSpeechInit.isBrowserSupport()) {
      if (text) {
        setIsAudioOn(true);
        try {
          const utteranceCbk = await textToSpeech(text);
          utteranceCbk.onend = () => {
            setIsAudioOn(false);
            handleSuccess({ disbaleToast, msgType: 'SUCCESSFULFUL', msg: successMsg, successCb, data: text });
          };
          utteranceCbk.onerror = () => setIsAudioOn(false);
        } catch (error) {
          return handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error, failureCb });
        }
      } else {
        return handleError({ disbaleToast, msgType: 'BAD_REQUEST', msg: failureMsg.badRequest, failureCb });
      }
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return true;
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsAudioOn(false);
    return handleError({ disbaleToast, msgType: 'CANCELLED', msg: failureMsg.cancelled || 'Feature Cancelled', failureCb });
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return React.Children.map(children, (child) => React.cloneElement(child, {
    handleStop,
    handlePlay,
    isAudioOn,
    disbaleToast,
    successCb,
    successMsg,
    failureCb,
    failureMsg,
  }));
}

TextToSpeechInit.isBrowserSupport = () => globalThis.speechSynthesis
  && globalThis.speechSynthesis?.cancel
  && globalThis.speechSynthesis?.speak
  && true;

TextToSpeechInit.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

TextToSpeechInit.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    badRequest: '',
    error: '',
  },
};

export default Wrapper(TextToSpeechInit);
