import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';

function LocateMe({
  // disbaleToast,
  // successCb,
  // failureCb,
  // successMsg,
  // failureMsg,
  children,

}) {
  return (
    React.Children.map(children || 'Use my current location', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: () => {},
    }))
  );
}

LocateMe.isBrowserSupport = () => true;

LocateMe.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
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
};

export default Wrapper(LocateMe);
