import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import './voiceSearch.css';
// import Modal from '../../components/Modal/Modal';
// import VoiceLoader from './VoiceLoader';
// import LoadingDots from '../../components/LoadingDots/LoadingDots';

function VoiceRecognition({
  disbaleToast,
  successCb,
  successMsg,
  failureCb,
  failureMsg,
  cb,
  children,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [isLoadingDots, setIsLoadingDots] = useState(true);

  const listen = () => {
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
          cb(text, true);
          setModalVisible(false);
          setVoiceText('');
        }, 1500);
      }
    };
    recognition.start();
    recognition.onsoundstart = () => {
      setIsLoadingDots(false);
    };
    recognition.onsoundend = () => {
      setIsLoadingDots(true);
    };
    recognition.onerror = () => {
      setModalVisible(false);
    };
    recognition.onend = () => {
      recognition.abort();
      recognition.onresult = () => {};
      recognition.stop();
      setTimeout(() => setModalVisible(false), 1500);
    };
    setModalVisible(true);
  };

  return React.Children.map(children, (child) => React.cloneElement(child, {
    onClick: child.type.name === 'VoiceRecognitionIcon' ? listen : () => {},
    disbaleToast,
    successCb,
    successMsg,
    failureCb,
    failureMsg,
  }));
}

VoiceRecognition.isBrowserSupport = () => globalThis.speechSynthesis
  && globalThis.speechSynthesis?.cancel
  && globalThis.speechSynthesis?.speak
  && true;

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
  successMsg: '',
  failureMsg: {
    unSupported: '',
    error: '',
  },
};

export default Wrapper(VoiceRecognition);

// {
//   <FontAwesomeIcon icon="fa-solid fa-microphone"
// size="xl" style={{ color: 'var(--secondary)' }} className="voiceIcon" onClick={listen} />

//     modalVisible ? (
//       <Modal modalTitle="Listening..." onClickCloseIcon={() =>
// setModalVisible(false)} titleClasses="listen" modalClass="voice-modal">
//         <div className="voice-text">{voiceText}</div>
//         <div className="loading-container">
//           {isLoadingDots ? <LoadingDots /> : <VoiceLoader />}
//         </div>
//       </Modal>
//     ) : null
//   }
