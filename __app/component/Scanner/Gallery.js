import React from 'react';

function Gallery({
  disbaleToast,
  handleSuccess,
  successCb,
  successMsg,
  handleError,
  failureCb,
  failureMsg,
  children,
  zIndex,
  top,
  bottom,
  left,
  right,
  color,
}) {
  const onSelectGalleryImage = async (event) => {
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
            handleError({ disbaleToast, msgType: 'INVALID_IMAGE', msg: failureMsg.invalidImage, failureCb });
          }
        })
        .catch((error) => {
          handleError({ disbaleToast, msgType: 'UNABLE_TO_SCAN', msg: failureMsg.unableToScan || error, failureCb });
        });
    }
  };

  return (
    <label
      htmlFor="upload-photo"
      style={{
        top,
        bottom,
        left,
        right,
        zIndex,
        color,
        position: 'absolute',
      }}
    >
      {children || 'Gallery'}
      <input
        id="upload-photo"
        type="file"
        accept="image/png,image/jpeg"
        onChange={onSelectGalleryImage}
        onSelect={onSelectGalleryImage}
        style={{ display: 'none' }}
      />
    </label>
  );
}

Gallery.propTypes = {

};

Gallery.defaultProps = {
  color: 'white',
  top: 'auto',
  bottom: '18%',
  left: 'auto',
  right: '64%',
};

export default Gallery;

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
