import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

function PhoneBook({
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  children,
  contactProperty,
  isSelectMultiple,
}) {
  const getContacts = async () => {
    const opts = { multiple: isSelectMultiple };
    if (PhoneBook.isBrowserSupport()) {
      try {
        const contacts = await navigator.contacts.select(contactProperty, opts);
        if (contacts) {
          handleSuccess({ disbaleToast, msgType: 'SUCCESS', msg: successMsg, successCb, data: contacts });
        } else {
          return handleError({ disbaleToast, msgType: 'CANCELLED', msg: failureMsg.cancelled || 'Feature Cancelled', failureCb });
        }
      } catch (error) {
        return handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error || error, failureCb });
      }
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return true;
  };

  return (
    React.Children.map(children || 'PhoneBook', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: getContacts,
    }))
  );
}

PhoneBook.isBrowserSupport = () => globalThis.navigator.contacts
  && globalThis.ContactsManager
  && true;

PhoneBook.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  contactProperty: PropTypes.array,
  isSelectMultiple: PropTypes.bool,
};

PhoneBook.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    error: '',
  },
  contactProperty: ['name', 'email', 'tel', 'address', 'icon'],
  isSelectMultiple: false,
};

export default Wrapper(PhoneBook);
