import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'AutoFillOtp is not supporting in your device',
  error: 'Unable to fetch details from AutoFillOtp',
};

const isBrowserSupport = () => globalThis.OTPCredential;

const abortAutoFill = (abort, time) => {
  setTimeout(() => {
    // abort after two minutes
    abort.abort();
  }, time * 60 * 1000);
};

const autoFillOtp = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'OTP autofilled successfully',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

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
    return true;
  };

  init();
};

function AutoFillOtp({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
}) {
  return React.Children.map(children || 'AutoFillOtp', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => autoFillOtp({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
    }),
  }));
}

AutoFillOtp.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const WAutoFillOtp = Wrapper(AutoFillOtp, isBrowserSupport);

export { autoFillOtp, WAutoFillOtp as AutoFillOtp };

export default WAutoFillOtp;
