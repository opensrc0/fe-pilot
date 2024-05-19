/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'NetworkMonitor is not supporting in your device',
  error: 'Unable to fetch details from NetworkMonitor',
};

const isBrowserSupport = () => globalThis.navigator?.connection;

const networkMonitor = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Network Information available Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      const conObj = globalThis.navigator.connection;
      const newConObj = {};
      for (const name in conObj) {
        // If User offline, effectiveType should be 0g
        if (name === 'effectiveType' && conObj.type === 'none') {
          newConObj[name] = '0g';
          continue;
        }

        // Don't include functions in the new object
        if (Object.prototype.toString.call(conObj[name]) !== '[object Function]') {
          newConObj[name] = conObj[name];
        }
      }
      newConObj.isOnline = globalThis.navigator.onLine;

      handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: { ...newConObj } });

      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function NetworkMonitor({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
}) {
  const [isToastEnable, setIsToastEnable] = useState(false);
  const [isOnline, setIsOnline] = useState(globalThis.navigator?.onLine);

  useEffect(() => {
    globalThis?.navigator.connection.addEventListener('change', () => {
      if (isOnline !== globalThis.navigator?.onLine) {
        setIsToastEnable(true);
        setIsOnline(globalThis.navigator?.onLine);
      }
      networkMonitor({
        successCb,
        failureCb,
        loadingCb,
        successMsg,
        failureMsg,
      });
    });
  });

  return isToastEnable ? (
    React.Children.map(children, (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      isOnline,
      setIsToastEnable,
    }))
  ) : null;
}

NetworkMonitor.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const WNetworkMonitor = Wrapper(NetworkMonitor, isBrowserSupport);

export { networkMonitor, WNetworkMonitor as NetworkMonitor };

export default WNetworkMonitor;
