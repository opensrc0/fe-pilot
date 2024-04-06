import { handleError, handleSuccess } from '../services/handlerService';

const abortAutoFill = (abort, time) => {
  setTimeout(() => {
    // abort after two minutes
    abort.abort();
  }, time * 60 * 1000);
};

const defaultProps = {
  successCb: (() => {}),
  failureCb: (() => {}),
  successMsg: 'OTP autofilled successfully',
  failureMsg: {
    UN_SUPPORTED_FEATURE: 'Your device is not supporting AutofillOTP',
    ERROR: '',
  },
};
function AutoFillOtp(props = {}) {
  const successCb = props.successCb || defaultProps.successCb;
  const failureCb = props.failureCb || defaultProps.failureCb;
  const successMsg = props.successMsg || defaultProps.successMsg;
  const failureMsg = { ...defaultProps.failureMsg, ...props.failureMsg };

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
    return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
  }
}

AutoFillOtp.isBrowserSupport = () => globalThis.OTPCredential;

export default AutoFillOtp;
