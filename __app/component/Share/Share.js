/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'Share is not supporting in your device',
  badRequest: 'Missing props',
  error: 'Unable to share',
};

const isShareAPIDataValid = (sharingData) => {
  if (navigator.canShare) {
    return navigator.canShare(sharingData);
  }

  return true;
};

const isBrowserSupport = () => globalThis.navigator?.share && true;

const share = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Shared Successfully',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  sName = 'fe-pilot',
  sTitle = 'A React library for advance JS features',
  sUrl = 'https://www.npmjs.com/package/fe-pilot',
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };
  const sharingData = { title: sName, text: sTitle, url: sUrl };
  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });
      if (isShareAPIDataValid(sharingData)) {
        navigator.share(sharingData).then(() => {
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: sharingData });
        }).catch(() => handleError({ msgType: 'ERROR', msg: failureMsg.error, failureCb }));
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
  sName,
  sTitle,
  sUrl,
}) {
  return React.Children.map(children || 'Share', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => share({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      sName,
      sTitle,
      sUrl,
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
  sName: PropTypes.string,
  sTitle: PropTypes.string,
  sUrl: PropTypes.string,
};

const WShare = Wrapper(Share, isBrowserSupport);

export { share, WShare as Share };

export default WShare;
