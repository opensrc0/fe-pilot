const abortAutoFill = (abort, time) => {
  setTimeout(() => {
    // abort after two minutes
    abort.abort();
  }, time * 60 * 1000);
};

const AutoFillOtp = (successCb, failureCb) => {
  if ('OTPCredential' in window) {
    const abort = new AbortController();
    abortAutoFill(abort, 1);
    navigator.credentials.get({
      otp: { transport: ['sms'] },
      signal: abort.signal,
    }).then((otp) => {
      const { code } = otp;
      successCb(code);
    }).catch((error) => {
      failureCb(error);
    });
  }
};

export default AutoFillOtp;
