import { handleError, handleSuccess } from '../services/handlerService';

const abortAutoFill = (abort, time) => {
  setTimeout(() => {
    // abort after two minutes
    abort.abort();
  }, time * 60 * 1000);
};

function AutoFillOtp({
  successCb,
  successMsg,
  failureCb,
  failureMsg,
}) {
  if (AutoFillOtp.isBrowserSupport()) {
    const abort = new AbortController();
    abortAutoFill(abort, 3);
    navigator.credentials.get({
      otp: { transport: ['sms'] },
      signal: abort.signal,
    }).then((otp) => {
      const { code } = otp;
      handleSuccess({ disbaleToast: false, msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: code });
    }).catch((error) => handleError({ disbaleToast: false, msgType: 'ERROR', msg: error, failureCb }));
  } else {
    return handleError({ disbaleToast: false, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported || 'Your device is not supporting AutofillOTP', failureCb });
  }
}

AutoFillOtp.isBrowserSupport = () => globalThis.OTPCredential;

export default AutoFillOtp;
