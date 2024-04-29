import React, { useState, useEffect } from 'react';

function Wrapper(WrappedComponent, isBrowserSupport) {
  return function ({ showForever = true, ...props }) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      setShouldRender(showForever || isBrowserSupport?.());
    }, []);

    return shouldRender && <WrappedComponent {...props} />;
  };
}

export default Wrapper;
