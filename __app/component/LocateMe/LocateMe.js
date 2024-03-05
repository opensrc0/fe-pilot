import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// const isLocateMeAPISupport = () => globalThis.navigator.contacts && globalThis.ContactsManager;

function LocateMe({
  // disbaleToast,
  // successCb,
  // failureCb,
  // successMsg,
  // failureMsg,
  showForever,
  children,

}) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  console.log('Locateme');
  return isBrowser && (showForever || true) ? (
    React.Children.map(children || 'Use my current location', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: () => {},
    }))
  ) : null;
}

LocateMe.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  showForever: PropTypes.bool,
};

LocateMe.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    error: '',
  },
  showForever: true,
};

export default LocateMe;
