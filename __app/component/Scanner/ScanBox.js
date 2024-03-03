import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { browserDimensions } from '../utils/utils';

function ScanBox({ zIndex, marginTop, background, children }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [appCss, setAppCss] = useState({});

  useEffect(() => {
    const screen = browserDimensions();
    const borderTop = `${((screen.height - screen.width) / 2) - 80 + marginTop}px`;
    const borderBottom = `${((screen.height - screen.width) / 2) + 150 - marginTop}px`;

    setIsBrowser(true);
    setAppCss({ borderTop, borderBottom, width: screen.width, height: screen.height });
  }, []);

  return isBrowser && (children || (
    <div style={{
      left: '0px',
      top: '0',
      zIndex,
      position: 'absolute',
      boxSizing: 'border-box',
      width: appCss.width,
      height: appCss.height,
      borderLeft: '25px',
      borderRight: '25px',
      borderTop: appCss.borderTop,
      borderBottom: appCss.borderBottom,
      borderColor: background,
      borderStyle: 'solid',
    }}
    />
  ));
}

ScanBox.propTypes = {
  zIndex: PropTypes.number,
  marginTop: PropTypes.number,
  background: PropTypes.string,
};

ScanBox.defaultProps = {
  zIndex: 9,
  marginTop: 0,
  background: 'rgba(0, 0, 0, 0.7)',
};

export default ScanBox;
