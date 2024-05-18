import React from 'react';
import { handleSuccess, handleError } from '../services/handlerService';

function ScannerImageUpload({
  successCb,
  successMsg,
  failureCb,
  failureMsg,
  children,
  via,
  zIndex,
  top,
  bottom,
  left,
  right,
  color,
  position,
}) {
  const onSelectGalleryImage = async (event) => {
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

  const processBy = () => {
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
        {...processBy()}
        onChange={onSelectGalleryImage}
        onSelect={onSelectGalleryImage}
        style={{ display: 'none' }}
      />
    </label>
  );
}

ScannerImageUpload.defaultProps = {
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
  via: 'gallery',
  zIndex: 9,
  color: 'white',
  top: 'auto',
  bottom: '18%',
  left: 'auto',
  right: '64%',
  position: 'absolute',
};

export { ScannerImageUpload };

export default ScannerImageUpload;

// <input type="file" id="id" name="id" accept="image/png,image/jpeg" capture="filesystem" />
// <input type="file" accept="image/*" capture="filesystem" />

// const generateImage = async () => {
//   const resp = await fetch('https://i.postimg.cc/br85dpb4/Untitled-1.png');
//   if (!resp.ok) {
//     return console.error('Network error', resp.status);
//   }
//   const blob = await resp.blob();
//   console.log(blob);

//   const bmp = await createImageBitmap(blob);
//   return bmp;
// };
