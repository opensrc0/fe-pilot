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
        return handleError({ disbaleToast, msgType: 'MISSING_PARAMS', msg: failureMsg.badRequest, failureCb });
      }
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return true;
  };

  const handleStop = () => {
    globalThis.speechSynthesis.cancel();
    setIsAudioOn(false);
  };

  useEffect(() => {
    globalThis.speechSynthesis.cancel();
    return () => {
      globalThis.speechSynthesis.cancel();
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
  successMsg: 'Converted text to voice Successfully',
  failureMsg: {
    unSupported: 'Text To Speech feature is not supporting in your device',
    badRequest: 'Missing props',
    error: 'Unable to convert text to voice',
  },
};

export default Wrapper(TextToSpeechInit);
