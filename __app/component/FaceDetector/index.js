import FaceDetector from './FaceDetector';
import FaceDetectorFlash from './FaceDetectorFlash';
import FaceDetectorClose from './FaceDetectorClose';
import FaceDetectorFacing from './FaceDetectorFacing';

export {
  FaceDetector,
  FaceDetectorFlash,
  FaceDetectorClose,
  FaceDetectorFacing,
};

export default {
  Init: FaceDetector,
  Flash: FaceDetectorFlash,
  Close: FaceDetectorClose,
  Facing: FaceDetectorFacing,
};
