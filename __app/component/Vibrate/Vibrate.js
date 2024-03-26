import { handleError, handleSuccess } from '../services/handlerService';

function Vibrate({
  successCb,
  successMsg,
  failureCb,
  failureMsg,
  vibrationSeq,
}) {
  if (Vibrate.isBrowserSupport()) {
    window.navigator.vibrate(vibrationSeq || [100, 30, 100, 30, 100, 30, 200, 30, 200, 30]);
    handleSuccess({ disbaleToast: false, msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: '' });
  } else {
    return handleError({ disbaleToast: false, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported || 'Your device is not supporting AutofillOTP', failureCb });
  }
}

Vibrate.isBrowserSupport = () => globalThis?.navigator?.vibrate;

export default Vibrate;
