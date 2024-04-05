import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

function ColorPicker({
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  children,
}) {
  const pickColor = () => {
    if (ColorPicker.isBrowserSupport()) {
      const eyeDropper = new globalThis.EyeDropper();

      eyeDropper
        .open()
        .then((result) => {
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: result.sRGBHex });
        })
        .catch((error) => handleError({ msgType: 'ERROR', msg: failureMsg.error || JSON.stringify(error), failureCb }));
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  return React.Children.map(children || 'Copy Color', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: pickColor,
    onKeyDown: pickColor,
  }));
}

ColorPicker.isBrowserSupport = () => globalThis.EyeDropper;

ColorPicker.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

ColorPicker.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  successMsg: 'Color copied successfully!!',
  failureMsg: {
    unSupported: 'Your browser does not support the Color Picker fetaure',
    error: 'Unable to copy color code',
  },
};

export default Wrapper(ColorPicker);