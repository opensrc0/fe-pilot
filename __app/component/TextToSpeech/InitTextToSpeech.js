import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import textToSpeech from './textToSpeechService';
import { handleSuccess, handleError } from '../services/handlerService';

function InitTextToSpeech({
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
    setIsAudioOn(true);
    if (text) {
      try {
        const utteranceCbk = await textToSpeech(text);
        handleSuccess({ disbaleToast, msgType: 'SUCCESS', msg: successMsg, successCb, data: '' });
        utteranceCbk.onend = () => setIsAudioOn(false);
        utteranceCbk.onerror = () => setIsAudioOn(false);
      } catch (error) {
        return handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error, failureCb });
      }
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsAudioOn(false);
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return isAudioOn ? (
    React.Children.map(children, (child) => (child.type.name === 'StopTextToSpeech') && React.cloneElement(child, {
      onClick: handleStop,
      disbaleToast,
      successCb,
      successMsg,
      failureCb,
      failureMsg,
    }))
  ) : React.Children.map(children, (child) => (child.type.name === 'StartTextToSpeech') && React.cloneElement(child, {
    onClick: handlePlay,
    disbaleToast,
    successCb,
    successMsg,
    failureCb,
    failureMsg,
  }));
}

InitTextToSpeech.isBrowserSupport = () => globalThis.speechSynthesis
  && globalThis.speechSynthesis?.getVoice
  && globalThis.speechSynthesis?.cancel
  && globalThis.speechSynthesis?.speak;

InitTextToSpeech.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

InitTextToSpeech.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    error: '',
  },
};

export default Wrapper(InitTextToSpeech);
