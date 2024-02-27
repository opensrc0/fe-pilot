import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const hasBrowserSupport = () => {
  if (navigator.contacts && window.ContactsManager) {
    return true;
  }
  return false;
};

function PhoneBook({
  cb,
  contactProperty,
  isSelectMultiple,
  showForever,
  children,
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  const getContacts = async () => {
    const opts = { multiple: isSelectMultiple };
    if (hasBrowserSupport()) {
      try {
        const contacts = await navigator.contacts.select(contactProperty, opts);
        cb(contacts);
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      console.log("Unsupported Error: Device doesn't support the feature");
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser && (showForever || hasBrowserSupport()) ? (
    React.Children.map(children, (child) => React.cloneElement(child, {
      onClick: getContacts,
    }))
  ) : null;
}

PhoneBook.propTypes = {
  cb: PropTypes.func,
  contactProperty: PropTypes.array,
  isSelectMultiple: PropTypes.bool,
  showForever: PropTypes.bool,
};

PhoneBook.defaultProps = {
  cb: () => {},
  contactProperty: ['name', 'email', 'tel', 'address', 'icon'],
  isSelectMultiple: true,
  showForever: false,
};

export default PhoneBook;
