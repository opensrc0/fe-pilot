import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
  const sharingData = { title: sName, textasxzdsc: sTitle, url: sUrl };

  const showDropdown = () => {
    if (isShareAPISupport()) {
      if (isShareAPIDataValid(sharingData)) {
        navigator.share(sharingData).then(() => {
          if (!disbaleToast && successMsg) console.log('Success:', successMsg);
          successCb({ msgType: 'SUCCESS', msg: successMsg });
        }).catch((error) => {
          console.log(error);
          if (!disbaleToast && failureMsg.generalMsg) console.log(failureMsg.generalMsg || error);
          failureCb({ msgType: 'ERROR', msg: failureMsg.generalMsg || error });
        });
      } else {
        console.log('BAD_REQUEST');
        if (!disbaleToast && failureMsg.badRequestMsg) console.log(failureMsg.badRequestMsg);
        failureCb({ msgType: 'BAD_REQUEST', msg: failureMsg.badRequestMsg });
      }
    } else {
      console.log('UN_SUPPORTED_FEATURE');
      if (!disbaleToast && failureMsg.unSupportedMsg) console.log(failureMsg.unSupportedMsg);
      failureCb({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupportedMsg });
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser && (showForever || isShareAPISupport()) ? (
    React.Children.map(children, (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
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
    unSupportedMsg: '',
    badRequestMsg: '',
    generalMsg: '',
  },
  showForever: true,
  sName: 'fe-pilot',
  sTitle: 'A React library for advance JS features',
  sUrl: 'https://www.npmjs.com/package/fe-pilot',
};

export default Share;
