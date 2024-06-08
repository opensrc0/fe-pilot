import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';

function View360({
  imageList = [],
  height = '300px',
  width,
}) {
  const [imageIndexInView, setImageIndexInView] = useState(0);

  const changeImageM = (e) => {
    const touchObj = e.changedTouches[0];
    const spanTouched = document.elementFromPoint(touchObj.clientX, touchObj.clientY);
    if (spanTouched) {
      const spanIndex = spanTouched.style.getPropertyValue('--imageIndex');
      if (spanIndex) {
        setImageIndexInView(spanIndex - 1);
      }
    }
  };

  const changeImageW = (e) => {
    const spanTouched = e.target;
    if (spanTouched) {
      const spanIndex = spanTouched.style.getPropertyValue('--imageIndex');
      if (spanIndex) {
        setImageIndexInView(spanIndex - 1);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        height,
        width,
        overflow: 'hidden',
      }}
    >
      {
        imageList.map((image, i) => (
          <React.Fragment key={image}>
            <span
              style={{
                position: 'absolute',
                top: '0',
                left: `calc(100% /${imageList.length} * var(--imageIndex))`,
                zIndex: '11',
                width: `calc(100% /${imageList.length})`,
                height: '100%',
                '--imageIndex': `${i + 1}`,

              }}
              onTouchMove={changeImageM}
              onMouseMove={changeImageW}
            />
            <img
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                objectFit: 'cover',
                WebkitUserSelect: 'none',
                opacity: imageIndexInView === i ? 1 : 0,
                width: '100%',
                height: '100%',
              }}
              alt={image}
              src={image}
            />
          </React.Fragment>
        ))
      }
    </div>
  );
}

View360.propTypes = {
  imageList: PropTypes.array,
  height: PropTypes.string,
  width: PropTypes.string,
};

const WView360 = Wrapper(View360, true);

export { WView360 as View360 };

export default WView360;
