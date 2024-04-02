import { handleError, handleSuccess } from '../services/handlerService';

const abortAutoFill = (abort, time) => {
  setTimeout(() => {
    // abort after two minutes
    abort.abort();
  }, time * 60 * 1000);
};

function AutoFillOtp(props = {}) {
  const successCb = props.successCb || (() => {});
  const failureCb = props.failureCb || (() => {});
  const successMsg = props.successMsg || '';
  const failureMsg = props.failureMsg || {};

  if (AutoFillOtp.isBrowserSupport()) {
    const abort = new AbortController();
    abortAutoFill(abort, 3);
    navigator.credentials.get({
      otp: { transport: ['sms'] },
      signal: abort.signal,
    }).then((otp) => {
      const { code } = otp;
      handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: code });
    }).catch((error) => handleError({ msgType: 'ERROR', msg: error, failureCb }));
  } else {
    return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported || 'Your device is not supporting AutofillOTP', failureCb });
  }
}

AutoFillOtp.isBrowserSupport = () => globalThis.OTPCredential;

export default AutoFillOtp;
