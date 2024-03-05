/* eslint-disable  */
import React, { useEffect, useState, Children } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handler';

const isShareAPISupport = () => navigator.share;

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
  showForever,
  children,
  sName,
  sTitle,
  sUrl,
}) {
  const [isBrowser, setIsBrowser] = useState(false);
  const sharingData = { title: sName, text: sTitle, url: sUrl };

  const showDropdown = () => {
    if (isShareAPISupport()) {
      if (isShareAPIDataValid(sharingData)) {
        navigator.share(sharingData).then((data) => {
          handleSuccess({ disbaleToast, msgType: 'SUCCESS', msg: successMsg, successCb, data });
        }).catch((error) => {
          handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error || error, failureCb });
        });
      } else {
        handleError({ disbaleToast, msgType: 'BAD_REQUEST', msg: failureMsg.badRequest, failureCb });
      }
    } else {
      handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });      
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  return isBrowser && (showForever || isShareAPISupport()) ? (
    React.Children.map(children || "Share", (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: showDropdown,
    }))
  ) : null;
}

Share.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  showForever: PropTypes.bool,
  sName: PropTypes.string,
  sTitle: PropTypes.string,
  sUrl: PropTypes.string,
};

Share.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    badRequest: '',
    error: '',
  },
  showForever: true,
  sName: 'fe-pilot',
  sTitle: 'A React library for advance JS features',
  sUrl: 'https://www.npmjs.com/package/fe-pilot',
};

export default Share;
