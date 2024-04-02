import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

function CopyToClipboard({
  disbaleToast,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  children,
  elementToBeCopy,
}) {
  const copyText = () => {
    if (CopyToClipboard.isBrowserSupport()) {
      handleLoading({ loadingCb });
      navigator.clipboard.writeText(elementToBeCopy).then(() => {
        handleSuccess({ disbaleToast, msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: elementToBeCopy });
      }).catch((error) => handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error || error, failureCb }));
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  return React.Children.map(children || 'Copy', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: copyText,
    onKeyDown: copyText,
  }));
}

CopyToClipboard.isBrowserSupport = () => navigator.clipboard && true;

CopyToClipboard.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

CopyToClipboard.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'Copied Successfully',
  failureMsg: {
    unSupported: 'Copy To ClipBoard is not supporting in your device',
    error: 'Unable to copy',
  },
  edsd: 3,
};

export default Wrapper(CopyToClipboard);
