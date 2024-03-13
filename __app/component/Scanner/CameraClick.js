import React from 'react';
import { handleSuccess, handleError } from '../services/handlerService';

function CameraClick({
  disbaleToast,
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
      const WindowBarcodeDetector = window.BarcodeDetector;
      const barcodeDetector = new WindowBarcodeDetector();

      createImageBitmap(file)
        .then((image) => barcodeDetector.detect(image))
        .then((results) => {
          const barcode = results[0];
          if (barcode) {
            handleSuccess({
              disbaleToast,
              msgType: 'SUCCESS',
              msg: successMsg,
              successCb,
              data: { barCodeValue: barcode.rawValue, barCodeType: barcode.format },
            });
          } else {
            return handleError({ disbaleToast, msgType: 'INVALID_IMAGE', msg: failureMsg.invalidImage, failureCb });
          }
        })
        .catch((error) => handleError({ disbaleToast, msgType: 'UNABLE_TO_SCAN', msg: failureMsg.unableToScan || error, failureCb }));
    }
  };

  return (
    <label
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

CameraClick.propTypes = {

};

CameraClick.defaultProps = {
  disbaleToast: false,
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

export default CameraClick;
