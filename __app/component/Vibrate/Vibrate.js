import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'Vibrate is not supporting in your device',
  error: 'Unable to fetch details from Vibrate',
};

const isBrowserSupport = () => globalThis.navigator?.vibrate;

const vibrate = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Vibrated Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  vibrationSeq = [100, 30, 100, 30, 100, 30, 200, 30, 200, 30],
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      window.navigator.vibrate(vibrationSeq);
      handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: vibrationSeq });
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function Vibrate({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  return React.Children.map(children || 'Vibrate', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => vibrate({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      ...props,
    }),
  }));
}

Vibrate.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  vibrationSeq: PropTypes.array,
};

const WVibrate = Wrapper(Vibrate, isBrowserSupport);

export { vibrate, WVibrate as Vibrate };

export default WVibrate;
