import React from 'react';
import PropTypes from 'prop-types';
import { handleError, handleSuccess } from '../services/handlerService';

function WakeLock(props = {}) {
  const successCb = props.successCb || (() => { });
  const failureCb = props.failureCb || (() => { });
  const successMsg = props.successMsg || '';
  const failureMsg = props.failureMsg || {};
  const { children } = props;

  const wakeLock = async () => {
    if (WakeLock.isBrowserSupport()) {
      let wakeLocker = null;
      wakeLocker = await navigator.wakeLock.request('screen');
      try {
        if (wakeLocker) {
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb });
        } else {
          return handleError({
            msgType: 'CANCELLED',
            msg: failureMsg.cancelled,
            failureCb,
          });
        }
      } catch (error) {
        return handleError({
          msgType: 'ERROR',
          msg: failureMsg.error || JSON.stringify(error),
          failureCb,
        });
      }
    } else {
      return handleError({
        msgType: 'UN_SUPPORTED_FEATURE',
        msg:
          failureMsg.unSupported || 'WakeLock is not supporting in your device',
        failureCb,
      });
    }
    return true;
  };

  return (
    React.Children.map(children || 'WakeLock', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: wakeLock,
    }))
  );
}
WakeLock.isBrowserSupport = () => 'wakeLock' in navigator;

WakeLock.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

WakeLock.defaultProps = {
  successCb: () => { },
  failureCb: () => { },
  successMsg: 'WakeLock successfully!!',
  failureMsg: {
    unSupported: 'Your browser does not support the WakeLock fetaure',
    error: 'Unable to apply WakeLock',
  },
};
export default WakeLock;
