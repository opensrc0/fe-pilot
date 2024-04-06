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

function Share({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg: failureMsgProps,
  children,
  sName,
  sTitle,
  sUrl,
}) {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };
  const sharingData = { title: sName, text: sTitle, url: sUrl };

  const showDropdown = () => {
    if (Share.isBrowserSupport()) {
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

  return (
    React.Children.map(children || 'Share', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: showDropdown,
    }))
  );
}

Share.isBrowserSupport = () => navigator.share && true;

Share.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  sName: PropTypes.string,
  sTitle: PropTypes.string,
  sUrl: PropTypes.string,
};

Share.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'Shared Successfully',
  failureMsg: { ...failureMsgDefault },
  sName: 'fe-pilot',
  sTitle: 'A React library for advance JS features',
  sUrl: 'https://www.npmjs.com/package/fe-pilot',
};

export default Wrapper(Share);
