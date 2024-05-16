import React from 'react';
import { handleSuccess, handleError } from '../services/handlerService';

function ScannerCamera({
  successCb,
  successMsg,
  failureCb,
  failureMsg,
  children,
  zIndex,
  top,
  bottom,
  left,
  right,
  color,
  position,
}) {
  const onClickImage = async (event) => {
    const file = event.target.files[0];
    if ('BarcodeDetector' in globalThis) {
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
        .catch((error) => handleError({ msgType: 'UNABLE_TO_SCAN', msg: failureMsg.unableToScan || JSON.stringify(error), failureCb }));
    }
  };

  return (
    <label
      id="fe-pilot-click-photo"
      htmlFor="click-photo"
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
      {children || 'Camera'}
      <input
        id="click-photo"
        type="file"
        accept="*"
        capture="filesystem"
        onChange={onClickImage}
        onSelect={onClickImage}
        style={{ display: 'none' }}
      />
    </label>
  );
}

ScannerCamera.propTypes = {

};

ScannerCamera.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    streaming: '',
    barCodeDetection: '',
    invalidImage: '',
    flash: '',
    unableToScan: '',
  },
  zIndex: 9,
  color: 'white',
  top: 'auto',
  bottom: '18%',
  left: 'auto',
  right: '25%',
  position: 'absolute',
};

export { ScannerCamera };

export default ScannerCamera;
