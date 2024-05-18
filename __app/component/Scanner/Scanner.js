import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

let mediaStream = null;
let videoUnmount = null;
let unmoutRenderLoop = null;

const failureMsgDefault = {
  unSupported: 'QR-Code/Bar-Code/UPI Scanner is not supporting in your device',
  streamingFailed: 'Camera streaming failed',
  barCodeDetectionFailed: 'Bar code detection failed',
  flashUnsupported: 'Flash is not supporting in your device',
};

const isBrowserSupport = () => globalThis.navigator?.mediaDevices && globalThis.BarcodeDetector;

function Scanner({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Scanned successfully',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  cameraType = 'back',
  zIndex = 9,
  children,
} = {}) {
  let list = null;
  let video = null;
  let facingMode;
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

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

    // eslint-disable-next-line consistent-return
    async function render() {
      try {
        const barcodes = await barcodeDetector.detect(video);
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
      } catch (error) {
        return handleError({ msgType: 'BAR_CODE_DETECTION_FAILED', msg: failureMsg.barCodeDetectionFailed || JSON.stringify(error), failureCb });
      }
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
    video.style.transform = 'rotateY(180deg)';
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
      return handleError({ msgType: 'STREAMING_FAILED', msg: failureMsg.streamingFailed || JSON.stringify(error), failureCb });
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
      return handleError({ msgType: 'FLASH_UPSUPPORTED', msg: failureMsg.flashUnsupported, failureCb });
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
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });
      facingMode = cameraType === 'back' ? 'environment' : 'user';
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

  return isBrowser && isBrowserSupport() && (
    <div id="scanner">
      <div id="camera" />
      {
        React.Children.map(children, (child) => React.cloneElement(child, {
          zIndex,
          allClear,
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

Scanner.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  zIndex: PropTypes.number,
  cameraType: PropTypes.oneOf(['back', 'front']),
};

const WScanner = Wrapper(Scanner, isBrowserSupport);

export { WScanner as Scanner };

export default WScanner;
