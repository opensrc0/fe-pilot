import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const isShareAPIDataValid = (sharingData) => {
  if (navigator.canShare) {
    return navigator.canShare(sharingData);
  }

  return true;
};

function Share({
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  children,
  sName,
  sTitle,
  sUrl,
}) {
  const sharingData = { title: sName, text: sTitle, url: sUrl };

  const showDropdown = () => {
    if (Share.isBrowserSupport()) {
      if (isShareAPIDataValid(sharingData)) {
        navigator.share(sharingData).then(() => {
          handleSuccess({ disbaleToast, msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: sharingData });
        }).catch(() => handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error, failureCb }));
      } else {
        return handleError({ disbaleToast, msgType: 'BAD_REQUEST', msg: failureMsg.badRequest, failureCb });
      }
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
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
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  sName: PropTypes.string,
  sTitle: PropTypes.string,
  sUrl: PropTypes.string,
};

Share.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  successMsg: 'Shared Successfully',
  failureMsg: {
    unSupported: 'Share is not supporting in your device',
    badRequest: 'Missing props',
    error: 'Unable to share',
  },
  sName: 'fe-pilot',
  sTitle: 'A React library for advance JS features',
  sUrl: 'https://www.npmjs.com/package/fe-pilot',
};

export default Wrapper(Share);
