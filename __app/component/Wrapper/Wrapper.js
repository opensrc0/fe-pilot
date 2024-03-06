import React, { useState, useEffect } from 'react';

function Wrapper(WrappedComponent) {
  return function ({ showForever = true, ...props }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
      setIsBrowser(true);
    }, []);

    return isBrowser && (showForever || WrappedComponent.isBrowserSupport?.()) ? (
      <WrappedComponent {...props} />
    ) : null;
  };
}

export default Wrapper;
