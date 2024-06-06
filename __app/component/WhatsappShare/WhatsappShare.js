import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'WhatsappShare is not supporting in your device',
  error: '',
};
const isBrowserSupport = () => globalThis;

const whatsAppShare = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'WhatsappShare details fetch Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  mobile,
  msg = '',
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      if (navigator.userAgent.match(/iPhone|Android/i)) {
        if (mobile) {
          window.location.href = `https://wa.me/${mobile}/?text=${msg}`;
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: msg });
        } else if (msg) {
          window.location.href = `https://wa.me/?text=${msg}`;
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: msg });
        } else {
          return handleError({ msgType: 'ERROR', msg: failureMsg.error || 'Mandatory props are missing', failureCb });
        }
      } else {
        window.location.href = `https://web.whatsapp.com/send?text=${msg}&phone=${mobile}`;
      }

      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function WhatsAppShare({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  return React.Children.map(children || 'WhatsAppShare', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => whatsAppShare({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      ...props,
    }),
  }));
}

WhatsAppShare.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  mobile: PropTypes.number,
  msg: PropTypes.string,
};

const WWhatsAppShare = Wrapper(WhatsAppShare, isBrowserSupport);

export { whatsAppShare, WWhatsAppShare as WhatsAppShare };

export default WWhatsAppShare;
