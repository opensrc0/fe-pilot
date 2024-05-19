import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'WakeLock is not supporting in your device',
  error: 'Unable to fetch details from WakeLock',
};

const isBrowserSupport = () => globalThis.navigator?.wakeLock;

const wakeLock = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'WakeLock successfully applied in your Device!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      let wakeLocker = null;
      wakeLocker = navigator.wakeLock.request('screen');
      try {
        if (wakeLocker) {
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb });
        } else {
          return handleError({ msgType: 'CANCELLED', failureCb });
        }
      } catch (error) {
        return handleError({ msgType: 'ERROR', msg: failureMsg.error || JSON.stringify(error), failureCb });
      }
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function WakeLock({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
}) {
  return React.Children.map(children || 'WakeLock', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => wakeLock({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
    }),
  }));
}

WakeLock.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const WWakeLock = Wrapper(WakeLock, isBrowserSupport);

export { wakeLock, WWakeLock as WakeLock };

export default WWakeLock;
