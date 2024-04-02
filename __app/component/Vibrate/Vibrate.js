import { handleError, handleSuccess } from '../services/handlerService';

function Vibrate(props = {}) {
  const successCb = props.successCb || (() => {});
  const failureCb = props.failureCb || (() => {});
  const successMsg = props.successMsg || '';
  const failureMsg = props.failureMsg || {};
  const vibrationSeq = props.vibrationSeq || [100, 30, 100, 30, 100, 30, 200, 30, 200, 30];

  if (Vibrate.isBrowserSupport()) {
    window.navigator.vibrate(vibrationSeq);
    handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: vibrationSeq });
  } else {
    return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported || 'Your device is not supporting Vibrate', failureCb });
  }
}

Vibrate.isBrowserSupport = () => globalThis?.navigator?.vibrate;

export default Vibrate;
