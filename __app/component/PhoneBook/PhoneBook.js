import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const isPhoneBookAPISupport = () => navigator.contacts && window.ContactsManager;

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
        if (!disbaleToast && successMsg) console.log('Success:', successMsg);
        successCb({ msgType: 'SUCCESS', msg: successMsg, data: contacts });
      } catch (error) {
        if (!disbaleToast && failureMsg.generalMsg) console.log(failureMsg.generalMsg || error);
        failureCb({ msgType: 'ERROR', msg: failureMsg.generalMsg || error });
      }
    } else {
      if (!disbaleToast && failureMsg.unSupportedMsg) console.log(failureMsg.unSupportedMsg);
      failureCb({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupportedMsg });
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
    unSupportedMsg: '',
    badRequestMsg: '',
    generalMsg: '',
  },
  showForever: false,
  contactProperty: ['name', 'email', 'tel', 'address', 'icon'],
  isSelectMultiple: false,
};

export default PhoneBook;
