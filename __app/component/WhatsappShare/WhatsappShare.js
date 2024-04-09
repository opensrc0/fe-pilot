import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'WhatsappShare is not supporting in your device',
  badRequest: 'msg is missing',
  error: 'Unable to fetch details from WhatsappShare',
};

function WhatsappShare({
  successCb,
  failureCb,
  successMsg,
  failureMsg: failureMsgProps,
  children,
  mobile,
  msg,
}) {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const getWhatsappShare = () => {
    if (mobile) {
      window.location.href = `https://wa.me/${mobile}/?text=${msg}`;
      handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: msg });
    } else if (msg) {
      window.location.href = `https://wa.me/?text=${msg}`;
      handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: msg });
    } else {
      return handleError({ msgType: 'BAD_REQUEST', msg: failureMsg.badRequest, failureCb });
    }

    return true;
  };

  return (
    <div>
      {React.Children.map(children || 'Whatsapp Share', (child) => React.cloneElement(
        typeof child === 'string' ? <span>{child}</span> : child,
        {
          onClick: getWhatsappShare,
        },
      ))}
    </div>
  );
}

WhatsappShare.isBrowserSupport = () => globalThis && true;

WhatsappShare.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  mobile: PropTypes.number,
  msg: PropTypes.string,
};

WhatsappShare.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  successMsg: 'WhatsappShare details fetch Successfully',
  failureMsg: { ...failureMsgDefault },
  mobile: '',
  msg: '',
};

export default Wrapper(WhatsappShare);
