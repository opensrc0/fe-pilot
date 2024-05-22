import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'Share is not supporting in your device',
  badRequest: 'Mandatory props are missing',
  error: '',
};

const isShareAPIDataValid = (sharingData) => {
  if (navigator.canShare) {
    return navigator.canShare(sharingData);
  }

  return true;
};

const isBrowserSupport = () => globalThis.navigator?.share;

const share = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Shared Successfully',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  title = 'fe-pilot',
  description = 'A React library for advanced JS features',
  url = 'https://www.npmjs.com/package/fe-pilot',
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };
  const sharingData = { title, text: description, url };
  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });
      if (isShareAPIDataValid(sharingData)) {
        navigator.share(sharingData).then(() => {
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: sharingData });
        }).catch((error) => handleError({ msgType: 'ERROR', msg: failureMsg.error || error?.message || 'Unable to share', failureCb }));
      } else {
        return handleError({ msgType: 'BAD_REQUEST', msg: failureMsg.badRequest, failureCb });
      }
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function Share({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  title,
  description,
  url,
}) {
  return React.Children.map(children || 'Share', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => share({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      title,
      description,
      url,
    }),
  }));
}

Share.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
};

const WShare = Wrapper(Share, isBrowserSupport);

export { share, WShare as Share };

export default WShare;
