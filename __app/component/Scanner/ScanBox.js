import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { browserDimensions } from '../utils/utils';

function ScanBox({ zIndex }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [appCss, setAppCss] = useState({});

  useEffect(() => {
    const screen = browserDimensions();
    const borderTop = `${((screen.height - screen.width) / 2)}px`;
    const borderBottom = `${((screen.height - screen.width) / 2) + 50}px`;

    setIsBrowser(true);
    setAppCss({ borderTop, borderBottom, width: screen.width, height: screen.height });
  }, []);

  return isBrowser && (
    <div style={{
      left: '0px',
      top: '0',
      zIndex,
      boxSizing: 'border-box',
      borderLeft: '25px',
      borderRight: '25px',
      borderTop: appCss.borderTop,
      borderBottom: appCss.borderBottom,
      borderColor: 'rgba(0, 0, 0, 0.7)',
      borderStyle: 'solid',
      boxShadow: '#e42529 0px 0px 0px 5px inset',
      position: 'absolute',
      width: appCss.width,
      height: appCss.height,
    }}
    >
      {
      // <AnimateCss width={appCss.width} />
      }
    </div>
  );
}

ScanBox.propTypes = {
  zIndex: PropTypes.number,
};

ScanBox.defaultProps = {
  zIndex: 9,
};

export default ScanBox;
