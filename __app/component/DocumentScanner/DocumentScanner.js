import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: 'DocumentScanner is not supporting in your device',
  error: '',
  badRequest: 'image, file, dataUrl, or src is required',
  pdfUnsupported: 'PDF export requires jsPDF. Add jsPDF to window or pass outputType="image".',
};

const isBrowserSupport = () => globalThis?.HTMLCanvasElement && globalThis?.Image;

const toGray = (data) => {
  const out = new Uint8ClampedArray(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const v = (r * 0.299) + (g * 0.587) + (b * 0.114);
    out[i] = v;
    out[i + 1] = v;
    out[i + 2] = v;
    out[i + 3] = a;
  }
  return out;
};

const sharpen = (data, width, height) => {
  const out = new Uint8ClampedArray(data.length);
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  const getIdx = (x, y) => (y * width + x) * 4;

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      let r = 0;
      let g = 0;
      let b = 0;
      let k = 0;
      for (let ky = -1; ky <= 1; ky += 1) {
        for (let kx = -1; kx <= 1; kx += 1) {
          const idx = getIdx(x + kx, y + ky);
          r += data[idx] * kernel[k];
          g += data[idx + 1] * kernel[k];
          b += data[idx + 2] * kernel[k];
          k += 1;
        }
      }
      const o = getIdx(x, y);
      out[o] = Math.max(0, Math.min(255, r));
      out[o + 1] = Math.max(0, Math.min(255, g));
      out[o + 2] = Math.max(0, Math.min(255, b));
      out[o + 3] = data[o + 3];
    }
  }
  return out;
};

const threshold = (data, value) => {
  const out = new Uint8ClampedArray(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const v = data[i] >= value ? 255 : 0;
    out[i] = v;
    out[i + 1] = v;
    out[i + 2] = v;
    out[i + 3] = data[i + 3];
  }
  return out;
};

const detectEdgesRect = (grayData, width, height, edgeThreshold) => {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;
  const get = (x, y) => grayData[(y * width + x) * 4];

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const gx = -get(x - 1, y - 1) - 2 * get(x - 1, y) - get(x - 1, y + 1)
        + get(x + 1, y - 1) + 2 * get(x + 1, y) + get(x + 1, y + 1);
      const gy = -get(x - 1, y - 1) - 2 * get(x, y - 1) - get(x + 1, y - 1)
        + get(x - 1, y + 1) + 2 * get(x, y + 1) + get(x + 1, y + 1);
      const mag = Math.sqrt((gx * gx) + (gy * gy));
      if (mag > edgeThreshold) {
        found = true;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!found) {
    return null;
  }

  return [
    { x: minX, y: minY },
    { x: maxX, y: minY },
    { x: maxX, y: maxY },
    { x: minX, y: maxY },
  ];
};

const solveHomography = (src, dst) => {
  const A = [];
  for (let i = 0; i < 4; i += 1) {
    const { x, y } = src[i];
    const u = dst[i].x;
    const v = dst[i].y;
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u]);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y, v]);
  }

  // Gaussian elimination
  for (let i = 0; i < 8; i += 1) {
    let maxRow = i;
    for (let r = i + 1; r < 8; r += 1) {
      if (Math.abs(A[r][i]) > Math.abs(A[maxRow][i])) {
        maxRow = r;
      }
    }
    const temp = A[i];
    A[i] = A[maxRow];
    A[maxRow] = temp;

    const pivot = A[i][i] || 1e-10;
    for (let c = i; c < 9; c += 1) {
      A[i][c] /= pivot;
    }
    for (let r = 0; r < 8; r += 1) {
      if (r !== i) {
        const factor = A[r][i];
        for (let c = i; c < 9; c += 1) {
          A[r][c] -= factor * A[i][c];
        }
      }
    }
  }

  const h = [A[0][8], A[1][8], A[2][8], A[3][8], A[4][8], A[5][8], A[6][8], A[7][8], 1];
  return h;
};

const invert3x3 = (m) => {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = (e * i) - (f * h);
  const B = (f * g) - (d * i);
  const C = (d * h) - (e * g);
  const det = (a * A) + (b * B) + (c * C);
  if (Math.abs(det) < 1e-10) {
    return null;
  }
  const invDet = 1 / det;
  return [
    A * invDet,
    ((c * h) - (b * i)) * invDet,
    ((b * f) - (c * e)) * invDet,
    B * invDet,
    ((a * i) - (c * g)) * invDet,
    ((c * d) - (a * f)) * invDet,
    C * invDet,
    ((b * g) - (a * h)) * invDet,
    ((a * e) - (b * d)) * invDet,
  ];
};

const warpPerspective = (srcCanvas, corners, outWidth, outHeight) => {
  const dstCorners = [
    { x: 0, y: 0 },
    { x: outWidth - 1, y: 0 },
    { x: outWidth - 1, y: outHeight - 1 },
    { x: 0, y: outHeight - 1 },
  ];
  const H = solveHomography(corners, dstCorners);
  const Hinv = invert3x3(H);
  if (!Hinv) return null;

  const srcCtx = srcCanvas.getContext('2d');
  const srcData = srcCtx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
  const outCanvas = document.createElement('canvas');
  outCanvas.width = outWidth;
  outCanvas.height = outHeight;
  const outCtx = outCanvas.getContext('2d');
  const outData = outCtx.createImageData(outWidth, outHeight);
  const src = srcData.data;
  const dst = outData.data;

  const sample = (x, y) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, srcCanvas.width - 1);
    const y1 = Math.min(y0 + 1, srcCanvas.height - 1);
    const dx = x - x0;
    const dy = y - y0;
    const idx = (y0 * srcCanvas.width + x0) * 4;
    const idxX1 = (y0 * srcCanvas.width + x1) * 4;
    const idxY1 = (y1 * srcCanvas.width + x0) * 4;
    const idxY1X1 = (y1 * srcCanvas.width + x1) * 4;
    const r = (src[idx] * (1 - dx) + src[idxX1] * dx) * (1 - dy)
      + (src[idxY1] * (1 - dx) + src[idxY1X1] * dx) * dy;
    const g = (src[idx + 1] * (1 - dx) + src[idxX1 + 1] * dx) * (1 - dy)
      + (src[idxY1 + 1] * (1 - dx) + src[idxY1X1 + 1] * dx) * dy;
    const b = (src[idx + 2] * (1 - dx) + src[idxX1 + 2] * dx) * (1 - dy)
      + (src[idxY1 + 2] * (1 - dx) + src[idxY1X1 + 2] * dx) * dy;
    const a = (src[idx + 3] * (1 - dx) + src[idxX1 + 3] * dx) * (1 - dy)
      + (src[idxY1 + 3] * (1 - dx) + src[idxY1X1 + 3] * dx) * dy;
    return [r, g, b, a];
  };

  for (let y = 0; y < outHeight; y += 1) {
    for (let x = 0; x < outWidth; x += 1) {
      const denom = (Hinv[6] * x) + (Hinv[7] * y) + Hinv[8];
      const sx = ((Hinv[0] * x) + (Hinv[1] * y) + Hinv[2]) / denom;
      const sy = ((Hinv[3] * x) + (Hinv[4] * y) + Hinv[5]) / denom;
      const o = (y * outWidth + x) * 4;
      if (sx >= 0 && sy >= 0 && sx < srcCanvas.width && sy < srcCanvas.height) {
        const [r, g, b, a] = sample(sx, sy);
        dst[o] = r;
        dst[o + 1] = g;
        dst[o + 2] = b;
        dst[o + 3] = a;
      } else {
        dst[o] = 255;
        dst[o + 1] = 255;
        dst[o + 2] = 255;
        dst[o + 3] = 255;
      }
    }
  }

  outCtx.putImageData(outData, 0, 0);
  return outCanvas;
};

const loadImage = ({ image, file, dataUrl, src }) => new Promise((resolve, reject) => {
  if (image instanceof globalThis.HTMLImageElement) {
    const targetImage = image;
    if (targetImage.complete) {
      resolve(targetImage);
    } else {
      targetImage.onload = () => resolve(targetImage);
      targetImage.onerror = reject;
    }
    return;
  }
  if (file instanceof Blob) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
    return;
  }
  if (typeof dataUrl === 'string' || typeof src === 'string') {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl || src;
    return;
  }
  reject(new Error('Invalid image source'));
});

const canvasToBlob = (canvas, type, quality) => new Promise((resolve) => {
  canvas.toBlob((blob) => resolve(blob), type, quality);
});

const toPdf = (dataUrl) => {
  const JsPdf = globalThis?.jspdf?.jsPDF || globalThis?.jsPDF;
  if (!JsPdf) return null;
  const doc = new JsPdf({ orientation: 'p', unit: 'px' });
  const img = new Image();
  return new Promise((resolve) => {
    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = (img.height / img.width) * pageWidth;
      doc.addImage(img, 'JPEG', 0, 0, pageWidth, pageHeight);
      resolve(doc.output('blob'));
    };
    img.src = dataUrl;
  });
};

const documentScanner = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Document scanned successfully',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
  image,
  file,
  dataUrl,
  src,
  corners,
  autoDetect = true,
  edgeThreshold = 90,
  warp = true,
  sharpenFilter = true,
  thresholdFilter = false,
  thresholdValue = 160,
  maxWidth = 1600,
  maxHeight = 1600,
  outputType = 'image',
  outputFormat = 'image/jpeg',
  quality = 0.92,
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = async () => {
    if (!isBrowserSupport()) {
      return handleError({
        msgType: 'UN_SUPPORTED_FEATURE',
        msg: failureMsg.unSupported,
        failureCb,
      });
    }
    if (!image && !file && !dataUrl && !src) {
      return handleError({ msgType: 'BAD_REQUEST', msg: failureMsg.badRequest, failureCb });
    }

    handleLoading({ loadingCb });

    try {
      const img = await loadImage({ image, file, dataUrl, src });
      const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height);
      const w = Math.max(1, Math.floor(img.width * scale));
      const h = Math.max(1, Math.floor(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      let scanCorners = corners;
      if (!scanCorners && autoDetect) {
        const data = ctx.getImageData(0, 0, w, h);
        const grayData = toGray(data.data);
        scanCorners = detectEdgesRect(grayData, w, h, edgeThreshold);
      }
      if (!scanCorners) {
        scanCorners = [
          { x: 0, y: 0 },
          { x: w, y: 0 },
          { x: w, y: h },
          { x: 0, y: h },
        ];
      }

      let outCanvas = canvas;
      if (warp && scanCorners) {
        const outWidth = Math.max(
          1,
          Math.floor(Math.hypot(
            scanCorners[1].x - scanCorners[0].x,
            scanCorners[1].y - scanCorners[0].y,
          )),
        );
        const outHeight = Math.max(
          1,
          Math.floor(Math.hypot(
            scanCorners[2].x - scanCorners[1].x,
            scanCorners[2].y - scanCorners[1].y,
          )),
        );
        const warped = warpPerspective(canvas, scanCorners, outWidth, outHeight);
        if (warped) {
          outCanvas = warped;
        }
      }

      const outCtx = outCanvas.getContext('2d');
      const outImage = outCtx.getImageData(0, 0, outCanvas.width, outCanvas.height);
      let outData = toGray(outImage.data);
      if (sharpenFilter) {
        outData = sharpen(outData, outCanvas.width, outCanvas.height);
      }
      if (thresholdFilter) {
        outData = threshold(outData, thresholdValue);
      }
      outImage.data.set(outData);
      outCtx.putImageData(outImage, 0, 0);

      const dataUrlOut = outCanvas.toDataURL(outputFormat, quality);
      const blobOut = await canvasToBlob(outCanvas, outputFormat, quality);

      if (outputType === 'pdf') {
        const pdfBlob = await toPdf(dataUrlOut);
        if (!pdfBlob) {
          return handleError({
            msgType: 'UN_SUPPORTED_FEATURE',
            msg: failureMsg.pdfUnsupported,
            failureCb,
          });
        }
        return handleSuccess({
          msgType: 'SUCCESSFUL',
          msg: successMsg,
          successCb,
          data: { blob: pdfBlob, corners: scanCorners },
        });
      }

      return handleSuccess({
        msgType: 'SUCCESSFUL',
        msg: successMsg,
        successCb,
        data: { dataUrl: dataUrlOut, blob: blobOut, corners: scanCorners },
      });
    } catch (error) {
      return handleError({
        msgType: 'ERROR',
        msg: failureMsg.error || error?.message || 'Unable to scan document',
        failureCb,
      });
    }
  };

  init();
};

function DocumentScanner({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  return React.Children.map(children || 'DocumentScanner', (child) => React.cloneElement(
    typeof child === 'string' ? <span>{child}</span> : child,
    {
      onClick: () => documentScanner({
        successCb,
        failureCb,
        loadingCb,
        successMsg,
        failureMsg,
        ...props,
      }),
    },
  ));
}

DocumentScanner.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
  image: PropTypes.any,
  file: PropTypes.any,
  dataUrl: PropTypes.string,
  src: PropTypes.string,
  corners: PropTypes.array,
  autoDetect: PropTypes.bool,
  edgeThreshold: PropTypes.number,
  warp: PropTypes.bool,
  sharpenFilter: PropTypes.bool,
  thresholdFilter: PropTypes.bool,
  thresholdValue: PropTypes.number,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  outputType: PropTypes.string,
  outputFormat: PropTypes.string,
  quality: PropTypes.number,
};

const WDocumentScanner = Wrapper(DocumentScanner, isBrowserSupport);

export { documentScanner, WDocumentScanner as DocumentScanner };

export default WDocumentScanner;
