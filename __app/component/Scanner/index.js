import ScannerInit from './ScannerInit';
import ScannerScanBox from './ScannerScanBox';
import ScannerFlash from './ScannerFlash';
import ScannerClose from './ScannerClose';
import ScannerFacing from './ScannerFacing';
import ScannerGallery from './ScannerGallery';
import ScannerCamera from './ScannerCamera';

// Helps in tree shaking
export {
  ScannerInit,
  ScannerFlash,
  ScannerClose,
  ScannerScanBox,
  ScannerFacing,
  ScannerGallery,
  ScannerCamera,
};

export default {
  Init: ScannerInit,
  Flash: ScannerFlash,
  Close: ScannerClose,
  ScanBox: ScannerScanBox,
  Facing: ScannerFacing,
  Gallery: ScannerGallery,
  Camera: ScannerCamera,
};
