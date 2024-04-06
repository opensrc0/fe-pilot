import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'Copy To ClipBoard is not supporting in your device',
  error: 'Unable to copy',
};

function CopyToClipboard({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg: failureMsgProps,
  children,
  elementToBeCopy,
}) {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const copyText = () => {
    if (CopyToClipboard.isBrowserSupport()) {
      handleLoading({ loadingCb });
      navigator.clipboard.writeText(elementToBeCopy).then(() => {
        handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: elementToBeCopy });
      }).catch((error) => handleError({ msgType: 'ERROR', msg: failureMsg.error || JSON.stringify(error), failureCb }));
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
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
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

CopyToClipboard.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'Copied Successfully',
  failureMsg: { ...failureMsgDefault },
};

export default Wrapper(CopyToClipboard);
