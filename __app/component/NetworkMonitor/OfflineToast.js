import React, { useEffect } from 'react';

function OfflineUI({ zIndex, description = 'No Connection' }) {
  return (
    <div style={{
      zIndex,
      background: '#4d4d4d',
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

function OfflineToast({
  children,
  isOnline,
  setIsToastEnable,
  duration = 0,
  zIndex = 9,
}) {
  useEffect(() => {
    if (duration > 0 && !isOnline) {
      setTimeout(() => {
        setIsToastEnable(false);
      }, duration);
    }
  }, [isOnline]);

  return !isOnline && React.Children.map(
    children || <OfflineUI zIndex={zIndex} />,
    (child) => React.cloneElement(typeof child === 'string' ? <OfflineUI zIndex={zIndex} description={child} /> : child),
  );
}

export { OfflineToast };

export default OfflineToast;
