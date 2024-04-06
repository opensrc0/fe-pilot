import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'PhoneBook is not supporting in your device',
  cancelled: 'Feature Cancelled',
  error: 'Unable to fetch details from PhoneBook',
};

function PhoneBook({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg: failureMsgProps,
  children,
  contactProperty,
  isSelectMultiple,
}) {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const getContacts = async () => {
    const opts = { multiple: isSelectMultiple };
    if (PhoneBook.isBrowserSupport()) {
      handleLoading({ loadingCb });
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
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
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
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  contactProperty: PropTypes.array,
  isSelectMultiple: PropTypes.bool,
};

PhoneBook.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'Phonebook details fetch Successfully',
  failureMsg: { ...failureMsgDefault },
  contactProperty: ['name', 'email', 'tel', 'address', 'icon'],
  isSelectMultiple: false,
};

export default Wrapper(PhoneBook);
