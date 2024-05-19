import React, { useEffect } from 'react';

function OnlineUI({ zIndex, description = 'Back Online' }) {
  return (
    <div style={{
      zIndex,
      background: 'green',
      color: 'white',
      top: 'auto',
      bottom: 0,
      left: 'auto',
      right: 'auto',
      position: 'absolute',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
    }}
    >
      {description}
    </div>
  );
}

function OnlineToast({
  children,
  isOnline,
  setIsToastEnable,
  duration = 4444,
  zIndex = 9,
}) {
  useEffect(() => {
    if (duration > 0 && isOnline) {
      setTimeout(() => {
        setIsToastEnable(false);
      }, duration);
    }
  }, [isOnline]);

  return isOnline && React.Children.map(
    children || <OnlineUI zIndex={zIndex} />,
    (child) => React.cloneElement(typeof child === 'string' ? <OnlineUI zIndex={zIndex} description={child} /> : child),
  );
}

export { OnlineToast };

export default OnlineToast;
