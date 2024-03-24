/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError } from '../services/handlerService';

let mediaStream = null;
let videoUnmount = null;
let unmoutRenderLoop = null;

function ScannerInit({
  disbaleToast,
  successCb,
  failureCb,
  successMsg,
  failureMsg,
  cameraType,
  zIndex,
  children,
}) {
  let list = null;
  let video = null;
  let facingMode;

  const [flash, setFlash] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const stopStreaming = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const detectCodes = async () => {
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
                  msgType: 'SUCCESSFUL',
                  msg: successMsg,
                  successCb,
                  data: { barCodeValue: barcode.rawValue, barCodeType: barcode.format },
                });
              }
            });
          })
          .catch((error) => handleError({ disbaleToast, msgType: 'BAR_CODE_DETECTION', msg: failureMsg.barCodeDetection || error, failureCb }))
      ) : null;
    }

    unmoutRenderLoop = setTimeout(() => {
      (function renderLoop() {
        videoUnmount = requestAnimationFrame(renderLoop);
        render();
      }());
    }, 1000);
  };

  const createVideo = async (id) => {
    document.getElementById('streaming-video')?.remove();

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
      return handleError({ disbaleToast, msgType: 'STREAMING_ERROR', msg: failureMsg.streaming || error, failureCb });
    }
    return mediaStream;
  };

  const startVideo = async (id = 'camera') => {
    mediaStream = await startStreaming();
    createVideo(id);
    detectCodes();
  };

  const allClear = () => {
    cancelAnimationFrame(videoUnmount);
    stopStreaming();
    clearTimeout(unmoutRenderLoop);
  };

  const toggleFlash = async () => {
    const track = mediaStream.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !flash }],
      });
      setFlash((s) => !s);
    } catch (error) {
      return handleError({ disbaleToast, msgType: 'FLASH', msg: failureMsg.flash, failureCb });
    }
    return true;
  };

  const toggleCamera = () => {
    facingMode = facingMode === 'user' ? 'environment' : 'user';

    stopStreaming();
    cancelAnimationFrame(videoUnmount);
    clearTimeout(unmoutRenderLoop);
    startVideo();
  };

  useEffect(() => {
    setIsBrowser(true);

    if (ScannerInit.isBrowserSupport()) {
      facingMode = cameraType === 'back' ? 'environment' : 'user';
      startVideo();
    } else {
      return handleError({ disbaleToast, msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return () => {
      allClear();
    };
  }, []);

  return isBrowser && ScannerInit.isBrowserSupport() && (
    <div id="scanner">
      <div id="camera" />
      {
        React.Children.map(children, (child) => React.cloneElement(child, {
          zIndex,
          toggleCamera,
          toggleFlash,
          disbaleToast,
          successCb,
          successMsg,
          failureCb,
          failureMsg,
        }))
      }
    </div>
  );
}

ScannerInit.isBrowserSupport = () => navigator?.mediaDevices && globalThis.BarcodeDetector;

ScannerInit.propTypes = {
  disbaleToast: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  zIndex: PropTypes.number,
  cameraType: PropTypes.oneOf(['back', 'front']),
};

ScannerInit.defaultProps = {
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
  cameraType: 'back',
};

export default ScannerInit;
