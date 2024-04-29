import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'CopyToClipboard is not supporting in your device',
  error: 'Unable To Copy',
};

const isBrowserSupport = () => globalThis?.navigator?.clipboard;

const copyToClipboard = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Copied Successfully',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  elementToBeCopy,
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      navigator.clipboard.writeText(elementToBeCopy).then(() => {
        handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: elementToBeCopy });
      }).catch((error) => handleError({ msgType: 'ERROR', msg: failureMsg.error || JSON.stringify(error), failureCb }));
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function CopyToClipboard({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  return React.Children.map(children || 'CopyToClipboard', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => copyToClipboard({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      ...props,
    }),
  }));
}

CopyToClipboard.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const WCopyToClipboard = Wrapper(CopyToClipboard, isBrowserSupport);

export { copyToClipboard, WCopyToClipboard as CopyToClipboard };

export default WCopyToClipboard;
