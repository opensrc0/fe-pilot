import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'PhoneBook is not supporting in your device',
  cancelled: 'Feature Cancelled',
  error: 'Unable to fetch details from PhoneBook',
};

const isBrowserSupport = () => globalThis.navigator?.contacts && globalThis.ContactsManage;

const phoneBook = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  contactProperty = ['name', 'email', 'tel', 'address', 'icon'],
  isSelectMultiple = false,
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = async () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });
      const opts = { multiple: isSelectMultiple };
      // Your Code will start from here
      try {
        const contacts = await navigator.contacts.select(contactProperty, opts);
        if (contacts[0]) {
          handleSuccess({ msgType: 'SUCCESSFUL', msg: successMsg, successCb, data: contacts });
        } else {
          return handleError({ msgType: 'CANCELLED', msg: failureMsg.cancelled, failureCb });
        }
      } catch (error) {
        return handleError({ msgType: 'ERROR', msg: failureMsg.error || JSON.stringify(error), failureCb });
      }
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function PhoneBook({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  return React.Children.map(children || 'PhoneBook', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => phoneBook({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      ...props,
    }),
  }));
}

PhoneBook.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,

};

const WPhoneBook = Wrapper(PhoneBook, isBrowserSupport);

export { phoneBook, WPhoneBook as PhoneBook };

export default WPhoneBook;
