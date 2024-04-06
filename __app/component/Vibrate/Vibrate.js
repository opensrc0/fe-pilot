import { handleError, handleSuccess } from '../services/handlerService';

const defaultProps = {
  successCb: (() => {}),
  failureCb: (() => {}),
  successMsg: 'OTP autofilled successfully',
  failureMsg: {
    UN_SUPPORTED_FEATURE: 'Your device is not supporting Vibrate',
    ERROR: '',
  },
  vibrationSeq: [100, 30, 100, 30, 100, 30, 200, 30, 200, 30],
};

function Vibrate(props = {}) {
  const successCb = props.successCb || defaultProps.successCb;
  const failureCb = props.failureCb || defaultProps.failureCb;
  const successMsg = props.successMsg || defaultProps.successMsg;
  const failureMsg = { ...defaultProps.failureMsg, ...props.failureMsg };

  const vibrationSeq = props.vibrationSeq || defaultProps.vibrationSeq;

  if (Vibrate.isBrowserSupport()) {
    window.navigator.vibrate(vibrationSeq);
    handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: vibrationSeq });
  } else {
    return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
  }
}

Vibrate.isBrowserSupport = () => globalThis?.navigator?.vibrate;

export default Vibrate;
