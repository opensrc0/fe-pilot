import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'NetworkConnection is not supported in your device',
  error: 'Unable to fetch details from NetworkConnection',
};

const defaultConnectionValue = {
  downlink: '',
  effectiveType: '',
  rtt: '',
  saveData: '',
};

function NetworkConnection({
  successCb = () => {},
  failureCb = () => {},
  successMsg = 'NetworkConnection details fetch Successfully',
  failureMsg: failureMsgProps,
  children,
}) {
  const [isOnline, setIsOnline] = useState(globalThis?.navigator.onLine);
  const [connectionDetails, setConnectionDetails] = useState(defaultConnectionValue);

  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const updateNetworkConnection = () => {
    setIsOnline(globalThis?.navigator?.onLine);

    const newObj = globalThis?.navigator?.connection;
    setConnectionDetails({
      downlink: newObj?.downlink,
      effectiveType: newObj?.effectiveType,
      rtt: newObj?.rtt,
      saveData: newObj?.saveData,
    });
  };

  const onlineOfflineHandler = () => {
    setIsOnline(globalThis?.navigator?.onLine);
  };

  const networkChangeHandler = () => {
    if (!globalThis?.navigator?.onLine) return;
    const newObj = globalThis?.navigator?.connection;

    setConnectionDetails({
      downlink: newObj?.downlink,
      effectiveType: newObj?.effectiveType,
      rtt: newObj?.rtt,
      saveData: newObj?.saveData,
    });
  };

  const handleUpdate = () => {
    if (NetworkConnection.isBrowserSupport() === true
     || NetworkConnection.isBrowserSupport() === false) {
      handleSuccess({ msgType: 'SUCCESSFUL',
        msg: successMsg,
        successCb,
        data: {
          online: isOnline,
          connectionDetail: connectionDetails,
        } });
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  useEffect(() => {
    handleUpdate();
  }, [isOnline, connectionDetails.effectiveType]);

  useEffect(() => {
    globalThis.addEventListener('online', onlineOfflineHandler);
    globalThis.addEventListener('offline', onlineOfflineHandler);
    globalThis?.navigator.connection.addEventListener('change', networkChangeHandler);

    updateNetworkConnection();

    return () => {
      globalThis.removeEventListener('online', onlineOfflineHandler);
      globalThis.removeEventListener('offline', onlineOfflineHandler);
      globalThis.navigator.connection.removeEventListener('change', networkChangeHandler);
    };
  }, []);

  return (
    React.Children.map(children || 'NetworkConnection', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child))
  );
}

NetworkConnection.isBrowserSupport = () => globalThis?.navigator?.onLine;

NetworkConnection.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

export default Wrapper(NetworkConnection);
