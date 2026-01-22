import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'Bluetooth is not supporting in your device',
  error: '',
  badRequest: 'filters or acceptAllDevices is required',
};

const isBrowserSupport = () => globalThis.navigator?.bluetooth?.requestDevice;

const bluetooth = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Bluetooth device selected successfully',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  filters,
  optionalServices,
  acceptAllDevices = false,
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      const options = {};
      if (Array.isArray(filters) && filters.length) {
        options.filters = filters;
      }
      if (Array.isArray(optionalServices) && optionalServices.length) {
        options.optionalServices = optionalServices;
      }
      if (acceptAllDevices === true) {
        options.acceptAllDevices = true;
      }

      if (!options.filters && !options.acceptAllDevices) {
        return handleError({
          msgType: 'BAD_REQUEST',
          msg: failureMsg.badRequest,
          failureCb,
        });
      }

      globalThis.navigator.bluetooth.requestDevice(options)
        .then((device) => {
          handleSuccess({
            msgType: 'SUCCESSFUL',
            msg: successMsg,
            successCb,
            data: device,
          });
        })
        .catch((error) => handleError({
          msgType: 'ERROR',
          msg: failureMsg.error || error?.message || 'Unable to connect with Bluetooth device',
          failureCb,
        }));
      // Your Code will end here
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

function Bluetooth({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  return React.Children.map(children || 'Bluetooth', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => bluetooth({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      ...props,
    }),
  }));
}

Bluetooth.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  filters: PropTypes.array,
  optionalServices: PropTypes.array,
  acceptAllDevices: PropTypes.bool,
};

const WBluetooth = Wrapper(Bluetooth, isBrowserSupport);

export { bluetooth, WBluetooth as Bluetooth };

export default WBluetooth;
