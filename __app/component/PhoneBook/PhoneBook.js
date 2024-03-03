import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const isPhoneBookAPISupport = () => navigator.contacts && window.ContactsManager;

const handleError = ({ disbaleToast, msg, msgType, failureCb }) => {
  console.log(msgType);
  if (!disbaleToast && msg) console.log(msg);
  failureCb({
    msgType,
    msg,
  });
};

const handleSuccess = ({ disbaleToast, msg, msgType, data, successCb }) => {
  console.log(msgType);
  if (!disbaleToast && msg) console.log('Success:', msg);
  successCb({
    msgType,
    msg,
    data,
  });
};

function PhoneBook({
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  showForever,
  children,
  contactProperty,
  isSelectMultiple,
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  const getContacts = async () => {
    const opts = { multiple: isSelectMultiple };
    if (isPhoneBookAPISupport()) {
      try {
        const contacts = await navigator.contacts.select(contactProperty, opts);
        handleSuccess({ disbaleToast, msgType: 'SUCCESS', msg: successMsg, successCb, data: contacts });
      } catch (error) {
        handleError({ disbaleToast, msgType: 'ERROR', msg: failureMsg.error || error, failureCb });
      }
    } else {
      handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser && (showForever || isPhoneBookAPISupport()) ? (
    React.Children.map(children, (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: getContacts,
    }))
  ) : null;
}

PhoneBook.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  showForever: PropTypes.bool,
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
  showForever: true,
  contactProperty: ['name', 'email', 'tel', 'address', 'icon'],
  isSelectMultiple: false,
};

export default PhoneBook;
