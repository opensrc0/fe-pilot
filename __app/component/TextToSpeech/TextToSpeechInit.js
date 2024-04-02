import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import textToSpeech from './textToSpeechService';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';

function TextToSpeechInit({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  children,
  text,
}) {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const handlePlay = async () => {
    if (TextToSpeechInit.isBrowserSupport()) {
      if (text) {
        handleLoading({ loadingCb });
        setIsAudioOn(true);
        try {
          const utteranceCbk = await textToSpeech(text);
          utteranceCbk.onend = () => {
            setIsAudioOn(false);
            handleSuccess({ msgType: 'SUCCESSFULFUL', msg: successMsg, successCb, data: text });
          };
          utteranceCbk.onerror = () => setIsAudioOn(false);
        } catch (error) {
          return handleError({ msgType: 'ERROR', msg: failureMsg.error, failureCb });
        }
      } else {
        return handleError({ msgType: 'MISSING_PARAMS', msg: failureMsg.badRequest, failureCb });
      }
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
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
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

TextToSpeechInit.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'Converted text to voice Successfully',
  failureMsg: {
    unSupported: 'Text To Speech feature is not supporting in your device',
    badRequest: 'Missing props',
    error: 'Unable to convert text to voice',
  },
};

export default Wrapper(TextToSpeechInit);
