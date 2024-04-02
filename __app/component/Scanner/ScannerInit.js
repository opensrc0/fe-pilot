/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

let mediaStream = null;
let videoUnmount = null;
let unmoutRenderLoop = null;

function ScannerInit({
  successCb,
  failureCb,
  loadingCb,
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
    const WindowBarcodeDetector = globalThis.BarcodeDetector;
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
                  msgType: 'SUCCESSFUL',
                  msg: successMsg,
                  successCb,
                  data: { barCodeValue: barcode.rawValue, barCodeType: barcode.format },
                });
              }
            });
          })
          .catch((error) => handleError({ msgType: 'BAR_CODE_DETECTION', msg: failureMsg.barCodeDetection || error, failureCb }))
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
      return handleError({ msgType: 'STREAMING_ERROR', msg: failureMsg.streaming || error, failureCb });
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
      return handleError({ msgType: 'FLASH', msg: failureMsg.flash, failureCb });
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

  const handleBrowserSupport = () => {
    if (ScannerInit.isBrowserSupport()) {
      facingMode = cameraType === 'back' ? 'environment' : 'user';
      handleLoading({ loadingCb });

      startVideo();
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }

    return true;
  };

  useEffect(() => {
    setIsBrowser(true);
    handleBrowserSupport();

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
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  zIndex: PropTypes.number,
  cameraType: PropTypes.oneOf(['back', 'front']),
};

ScannerInit.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: '',
  failureMsg: {
    unSupported: 'QR-Code/Bar-Code/UPI Scanner is not supporting in your device',
    streaming: 'Camera streaming failed',
    barCodeDetection: 'Bar code detection failed',
    invalidImage: 'Invalid Images',
    flash: 'Flash is not supporting in your device',
    unableToScan: 'Unable to scan',
  },
  zIndex: 9,
  cameraType: 'back',
};

export default Wrapper(ScannerInit);
