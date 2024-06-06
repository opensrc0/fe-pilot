import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'Your browser does not support the Color Picker fetaure',
  error: '',
};

const isBrowserSupport = () => globalThis.EyeDropper;

const colorPicker = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Color picked successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });
      const eyeDropper = new globalThis.EyeDropper();

      eyeDropper
        .open()
        .then((result) => {
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: result.sRGBHex });
        })
        .catch((error) => handleError({ msgType: 'ERROR', msg: failureMsg.error || error?.message || 'Unable to copy color code', failureCb }));
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function ColorPicker({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
}) {
  return React.Children.map(children || 'Copy Color', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => colorPicker({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
    }),
  }));
}

ColorPicker.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const WColorPicker = Wrapper(ColorPicker, isBrowserSupport);

export { colorPicker, WColorPicker as ColorPicker };

export default WColorPicker;
