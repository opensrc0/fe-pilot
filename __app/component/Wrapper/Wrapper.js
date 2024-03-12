import React, { useState, useEffect } from 'react';

function Wrapper(WrappedComponent) {
  return function ({ showForever = true, ...props }) {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      setShouldRender(showForever || WrappedComponent.isBrowserSupport?.());
    }, []);

    return shouldRender && <WrappedComponent {...props} />;
  };
}

export default Wrapper;
