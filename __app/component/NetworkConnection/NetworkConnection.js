import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  handleSuccess,
  handleError,
  handleLoading,
} from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'NetworkConnection is not supporting in your device',
  error: 'Unable to fetch details from NetworkConnection',
};

const isBrowserSupport = () => globalThis?.navigator?.onLine || false;

const networkConnection = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'NetworkConnection details fetch Successfully!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport() === true || isBrowserSupport() === false) {
      handleLoading({ loadingCb });

      handleSuccess({
        msgType: 'SUCCESSFUL',
        msg: successMsg,
        successCb,
        data: {
          online: globalThis?.navigator?.onLine,
          connectionDetail: globalThis?.navigator?.connection,
        },
      });
    } else {
      return handleError({
        msgType: 'UN_SUPPORTED_FEATURE',
        msg: failureMsg.unSupported,
        failureCb,
      });
    }
    return true;
  };

  init();
};

function NetworkConnection({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
}) {
  const [isOnline, setIsOnline] = useState(isBrowserSupport());

  const onlineOfflineHandler = () => {
    setIsOnline(globalThis?.navigator?.onLine);
    networkConnection(successCb, failureCb, loadingCb, successMsg, failureMsg);
  };

  const networkChangeHandler = () => {
    if (!isBrowserSupport()) return;

    networkConnection(successCb, failureCb, loadingCb, successMsg, failureMsg);
  };

  useEffect(() => {
    networkConnection(successCb, failureCb, loadingCb, successMsg, failureMsg);

    globalThis.addEventListener('online', onlineOfflineHandler);
    globalThis.addEventListener('offline', onlineOfflineHandler);
    globalThis?.navigator.connection.addEventListener('change', networkChangeHandler);

    return () => {
      globalThis.removeEventListener('online', onlineOfflineHandler);
      globalThis.removeEventListener('offline', onlineOfflineHandler);
      globalThis.navigator.connection.removeEventListener('change', networkChangeHandler);
    };
  }, []);

  return React.Children.map(children || 'NetworkConnection', (child) => React.cloneElement(
    typeof child === 'string' ? <span>{child}</span> : child,
    {
      isOnline,
    },
  ));
}

NetworkConnection.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const WNetworkConnection = Wrapper(NetworkConnection, isBrowserSupport);

export { networkConnection, WNetworkConnection as NetworkConnection };

export default WNetworkConnection;
