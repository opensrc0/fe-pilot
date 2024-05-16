import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';
import textToSpeechService from './textToSpeechService';
import { TextToSpeechStart } from './TextToSpeechStart';

const failureMsgDefault = {
  unSupported: 'Text To Speech feature is not supporting in your device',
  badRequest: 'Missing props/params',
  error: 'Unable to convert text to voice',
};

const isBrowserSupport = () => globalThis?.speechSynthesis
&& globalThis?.speechSynthesis?.cancel
&& globalThis?.speechSynthesis?.speak;

const textToSpeechStart = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  setIsAudioOn = () => {},
  successMsg = 'Converted text to voice Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  text,
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = async () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      if (text) {
        handleLoading({ loadingCb });
        setIsAudioOn(true);
        try {
          const utteranceCbk = await textToSpeechService(text);
          utteranceCbk.onend = () => {
            setIsAudioOn(false);
            handleSuccess({ msgType: 'SUCCESSFULFUL', msg: successMsg, successCb, data: text });
          };
          utteranceCbk.onerror = (e) => {
            setIsAudioOn(false);
            return handleError({ msgType: 'ERROR', msg: failureMsg.error || e.error, failureCb });
          };
        } catch (error) {
          return handleError({ msgType: 'ERROR', msg: failureMsg.error, failureCb });
        }
      } else {
        return handleError({ msgType: 'MISSING_PARAMS', msg: failureMsg.badRequest, failureCb });
      }
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

const textToSpeechStop = ({ setIsAudioOn }) => {
  globalThis.speechSynthesis.cancel();
  setIsAudioOn(false);
};

function TextToSpeech({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  const [isAudioOn, setIsAudioOn] = useState(false);

  useEffect(() => {
    globalThis.speechSynthesis.cancel();
    return () => {
      globalThis.speechSynthesis.cancel();
    };
  }, []);

  return React.Children.map(children || <TextToSpeechStart defaultShow />, (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    successCb,
    failureCb,
    loadingCb,
    successMsg,
    failureMsg,
    textToSpeechStart,
    textToSpeechStop,
    setIsAudioOn,
    isAudioOn,
    ...props,
  }));
}

TextToSpeech.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  text: PropTypes.string,
};

const WTextToSpeech = Wrapper(TextToSpeech, isBrowserSupport);

export { textToSpeechStart, textToSpeechStop, WTextToSpeech as TextToSpeech };

export default WTextToSpeech;
