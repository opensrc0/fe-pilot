/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { browserDimensions } from '../utils/utils';

let mediaStream = null;
let videoUnmount = null;
let unmoutRenderLoop = null;

const isScannerSupport = () => navigator && navigator.mediaDevices;

const handleError = ({ disbaleToast, msg, msgType, failureCb }) => {
  console.log(msgType);
  if (!disbaleToast && msg) console.log(msg);
  failureCb({
    msgType,
    msg,
  });
};

const handleSuccess = ({ disbaleToast, msg, msgType, data, successCb }) => {
  console.log(msgType);
  if (!disbaleToast && msg) console.log('Success:', msg);
  successCb({
    msgType,
    msg,
    data,
  });
};

function Scanner({
  disbaleToast,
  successCb,
  failureCb,
  onClose,
  successMsg,
  failureMsg,

  cameraType,
  zIndex,
  bgColor,
  // scanBoxTop,
  // scanBoxBottom,
  // scanBoxBorderWidth,
  // scanBoxBorderColor,
}) {
  let list = null;
  let video = null;
  let facingMode;

  const [flash, setFlash] = useState(false);
  const [appCss, setAppCss] = useState({});
  const [isBrowser, setIsBrowser] = useState(false);

  const stopStreaming = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const detectCodes = async () => {
    if ('BarcodeDetector' in window) {
      const WindowBarcodeDetector = window.BarcodeDetector;
      const barcodeDetector = new WindowBarcodeDetector();
      const itemsFound = [];

      function render() {
        // eslint-disable-next-line no-unused-expressions
        barcodeDetector.detect ? (
          barcodeDetector
            .detect(video)
            .then((barcodes) => {
              barcodes.forEach((barcode) => {
                if (!itemsFound.includes(barcode.rawValue)) {
                  itemsFound.push(barcode.rawValue);
                  handleSuccess({
                    disbaleToast,
                    msgType: 'SUCCESS',
                    msg: successMsg,
                    successCb,
                    data: { barCodeValue: barcode.rawValue, barCodeType: barcode.format },
                  });
                }
              });
            })
            .catch((error) => {
              handleError({ disbaleToast, msgType: 'BAR_CODE_DETECTION', msg: failureMsg.barCodeDetection || error, failureCb });
            })
        ) : null;
      }

      unmoutRenderLoop = setTimeout(() => {
        (function renderLoop() {
          videoUnmount = requestAnimationFrame(renderLoop);
          render();
        }());
      }, 1000);
    } else {
      handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
  };

  const createVideo = async (id) => {
    video = document.createElement('video');
    video.id = 'streaming-video';
    video.srcObject = mediaStream;
    video.autoplay = true;
    video.play();
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.position = 'absolute';
    video.style.overflow = 'hidden';
    video.style.display = 'block';
    video.style.zIndex = zIndex;
    video.style.top = '0';
    video.style.left = '0';
    video.style.objectFit = 'fill';
    list = document.getElementById(id);
    list.before(video);
  };

  const startStreaming = async () => {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          // deviceId: camera.deviceId,
          facingMode,
          zoom: true,
          resizeMode: true,
          focusDistance: true,
          focusMode: true,
        },
      });
    } catch (error) {
      handleError({ disbaleToast, msgType: 'STREAMING_ERROR', msg: failureMsg.streaming || error, failureCb });
    }
    return mediaStream;
  };

  const startVideo = async (id = 'camera') => {
    mediaStream = await startStreaming();
    createVideo(id);
    detectCodes();
  };

  const toggleCamera = () => {
    facingMode = facingMode === 'user' ? 'environment' : 'user';

    stopStreaming();
    cancelAnimationFrame(videoUnmount);
    clearTimeout(unmoutRenderLoop);
    startVideo();
  };

  const toggleFlash = async () => {
    const track = mediaStream.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !flash }],
      });
      setFlash((s) => !s);
    } catch (error) {
      handleError({ disbaleToast, msgType: 'FLASH', msg: failureMsg.flash, failureCb });
    }
  };

  const allClear = () => {
    console.log('unmount');
    cancelAnimationFrame(videoUnmount);
    stopStreaming();
    clearTimeout(unmoutRenderLoop);
  };

  useEffect(() => {
    const screen = browserDimensions();
    const borderTop = `${((screen.height - screen.width) / 2)}px solid rgba(0, 0, 0, 0.3)`;
    const borderBottom = `${((screen.height - screen.width) / 2) + 50}px solid rgba(0, 0, 0, 0.3)`;

    setIsBrowser(true);
    setAppCss({ borderTop, borderBottom, width: screen.width, height: screen.height });

    if (isScannerSupport()) {
      facingMode = cameraType === 'back' ? 'environment' : 'user';
      startVideo();
    } else {
      handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return () => {
      allClear();
    };
  }, []);

  return isBrowser && isScannerSupport() ? (
    <div className="scanner">
      <ul id="camera" />
      <div style={{
        left: '0px',
        top: '0',
        zIndex,
        boxSizing: 'border-box',
        borderLeft: '25px solid rgba(0, 0, 0, 0.3)',
        borderRight: '25px solid rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderTop: appCss.borderTop,
        borderBottom: appCss.borderBottom,
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
      <div
        style={{
          left: '0px',
          top: '0',
          zIndex,
          position: 'absolute',
          cursor: 'pointer',
        }}
        onClick={onClose}
        onKeyDown={(ev) => ev.key === 'Enter' && onClose()}
        role="button"
        tabIndex={0}
      >
        Back Button
      </div>
      <div
        style={{
          left: '0px',
          top: '0',
          zIndex,
          position: 'absolute',
          cursor: 'pointer',
        }}
        onClick={toggleCamera}
        onKeyDown={(ev) => ev.key === 'Enter' && toggleCamera()}
        role="button"
        tabIndex={0}
      >
        Toggle Camera
      </div>
      <div
        style={{
          left: 'auto',
          top: 0,
          right: 0,
          zIndex,
          position: 'absolute',
        }}
        onClick={toggleFlash}
        onKeyDown={(ev) => ev.key === 'Enter' && toggleFlash()}
        role="button"
        tabIndex={0}
      >
        Toggle Flash
      </div>
    </div>
  ) : null;
}

Scanner.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  onClose: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,

  zIndex: PropTypes.number,
  cameraType: PropTypes.oneOf(['back', 'front']),
};

Scanner.defaultProps = {
  disbaleToast: false,
  successCb: () => {},
  failureCb: () => {},
  onClose: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: '',
    streaming: '',
    barCodeDetection: '',
    flash: '',
    error: '',
  },

  zIndex: 9,
  cameraType: 'back',
};

export default Scanner;
