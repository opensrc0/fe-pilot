import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

function CopyToClipboard({
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  children,
  elementToBeCopy,
}) {
  const copyText = () => {
    if (CopyToClipboard.isBrowserSupport()) {
      navigator.clipboard.writeText(elementToBeCopy).then(() => {
        handleSuccess({ disbaleToast, msgType: 'SUCCESS', msg: successMsg, successCb, data: elementToBeCopy });
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
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

CopyToClipboard.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    error: '',
  },
};

export default Wrapper(CopyToClipboard);
