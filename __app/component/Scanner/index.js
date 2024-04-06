import Scanner from './Scanner';
import ScannerScanBox from './ScannerScanBox';
import ScannerFlash from './ScannerFlash';
import ScannerClose from './ScannerClose';
import ScannerFacing from './ScannerFacing';
import ScannerGallery from './ScannerGallery';
import ScannerCamera from './ScannerCamera';

// Helps in tree shaking
export {
  Scanner,
  ScannerFlash,
  ScannerClose,
  ScannerScanBox,
  ScannerFacing,
  ScannerGallery,
  ScannerCamera,
};

export default {
  Init: Scanner,
  Flash: ScannerFlash,
  Close: ScannerClose,
  ScanBox: ScannerScanBox,
  Facing: ScannerFacing,
  Gallery: ScannerGallery,
  Camera: ScannerCamera,
};
