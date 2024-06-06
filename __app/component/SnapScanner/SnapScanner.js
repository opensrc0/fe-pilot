import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'SnapScanner is not supporting in your device',
  invalidImage: 'Invalid Images',
  error: '',
};

const isBrowserSupport = () => 'BarcodeDetector' in globalThis;

const snapScanner = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  event,
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here
      const file = event.target.files[0];
      const WindowBarcodeDetector = globalThis.BarcodeDetector;
      const barcodeDetector = new WindowBarcodeDetector();

      createImageBitmap(file)
        .then((image) => barcodeDetector.detect(image))
        .then((results) => {
          const barcode = results[0];
          if (barcode) {
            handleSuccess({
              msgType: 'SUCCESSFUL',
              msg: successMsg,
              successCb,
              data: { barCodeValue: barcode.rawValue, barCodeType: barcode.format },
            });
          } else {
            return handleError({ msgType: 'INVALID_IMAGE', msg: failureMsg.invalidImage, failureCb });
          }
          return true;
        })
        .catch((error) => handleError({ msgType: 'ERROR', msg: failureMsg.error || error.message || 'Unable to scan', failureCb }));
      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

const processBy = (via) => {
  const attr = {};
  if (via === 'gallery') {
    attr.accept = 'image/*';
  }

  if (via === 'camera') {
    attr.accept = '*';
    attr.capture = 'filesystem';
  }

  if (via === 'phone') {
    attr.accept = 'image/png,image/jpeg';
    attr.capture = 'filesystem';
  }

  return attr;
};

function SnapScanner({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  via = 'gallery',
  zIndex = 9,
  color = 'white',
  top = 'auto',
  bottom = '18%',
  left = 'auto',
  right = '64%',
  position = 'absolute',
  ...props
} = {}) {
  return (
    <label
      htmlFor={`fe-pilot-scanner-imgp-${via}`}
      style={{
        top,
        bottom,
        left,
        right,
        zIndex,
        color,
        position,
      }}
    >
      {children || 'Gallery'}
      <input
        id={`fe-pilot-scanner-imgp-${via}`}
        type="file"
        {...processBy(via)}
        onChange={(event) => snapScanner({
          successCb,
          failureCb,
          loadingCb,
          successMsg,
          failureMsg,
          event,
          ...props,
        })}
        onSelect={(event) => snapScanner({
          successCb,
          failureCb,
          loadingCb,
          successMsg,
          failureMsg,
          event,
          ...props,
        })}
        style={{ display: 'none' }}
      />
    </label>
  );
}

SnapScanner.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  via: PropTypes.string,
};

const WSnapScanner = Wrapper(SnapScanner, isBrowserSupport);

export { snapScanner, WSnapScanner as SnapScanner };

export default WSnapScanner;
