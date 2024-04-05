import { handleError, handleSuccess } from '../services/handlerService';

function WakeLock(props = {}) {
  const successCb = props.successCb || (() => {});
  const failureCb = props.failureCb || (() => {});
  const successMsg = props.successMsg || '';
  const failureMsg = props.failureMsg || {};

  if (WakeLock.isBrowserSupport()) {
    // const abort = new AbortController();
    // abortAutoFill(abort, 3);
    // navigator.credentials.get({
    //   otp: { transport: ['sms'] },
    //   signal: abort.signal,
    // }).then((otp) => {
    //   const { code } = otp;
    //   handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: code });
    // }).catch((error) => handleError({ msgType: 'ERROR', msg: error, failureCb }));
  } else {
    return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported || 'WakeLock is not supporting in your device', failureCb });
  }
}

WakeLock.isBrowserSupport = () => 'wakeLock' in navigator;

export default WakeLock;
