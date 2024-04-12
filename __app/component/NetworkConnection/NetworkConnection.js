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
  successCb,
  failureCb,
  successMsg,
  failureMsg: failureMsgProps,
  children,
}) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionDetails, setConnectionDetails] = useState(defaultConnectionValue);

  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const updateNetworkConnection = () => {
    setIsOnline(navigator?.onLine);

    const newObj = navigator?.connection;
    setConnectionDetails({
      downlink: newObj?.downlink,
      effectiveType: newObj?.effectiveType,
      rtt: newObj?.rtt,
      saveData: newObj?.saveData,
    });
  };

  const onlineOflineHandler = () => {
    setIsOnline(navigator?.onLine);
  };

  const networkChangeHandler = () => {
    const newObj = navigator?.connection;
    console.log(connectionDetails);
    console.log(`${connectionDetails.effectiveType}!==${newObj.effectiveType}`);
    if (connectionDetails.effectiveType !== newObj.effectiveType) {
      console.log(newObj, ' newObj');
      setConnectionDetails({
        downlink: newObj?.downlink,
        effectiveType: newObj?.effectiveType,
        rtt: newObj?.rtt,
        saveData: newObj?.saveData,
      });
    }
  };

  const handleUpdate = () => {
    if (NetworkConnection.isBrowserSupport() === true
     || NetworkConnection.isBrowserSupport() === false) {
      handleSuccess({ msgType: 'SUCCESSFULFUL',
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
    globalThis.addEventListener('online', onlineOflineHandler);
    globalThis.addEventListener('offline', onlineOflineHandler);
    globalThis?.navigator.connection.addEventListener('change', networkChangeHandler);

    updateNetworkConnection();

    return () => {
      globalThis.removeEventListener('online', onlineOflineHandler);
      globalThis.removeEventListener('offline', onlineOflineHandler);
      globalThis.navigator.connection.removeEventListener('change', networkChangeHandler);
    };
  }, []);

  console.log(connectionDetails, ' outside connectionDetails');
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

NetworkConnection.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'NetworkConnection details fetch Successfully',
  failureMsg: { ...failureMsgDefault },
};

export default Wrapper(NetworkConnection);
