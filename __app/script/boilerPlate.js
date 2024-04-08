// console.log('Boiler Plate');
// console.log(process.env.COMPONENT);
const fs = require('fs');
const path = require('path');
const { mkdirp } = require('mkdirp');

const { COMPONENT } = process.env;
// const srcPath = path.resolve(__dirname, '__app/component');
const componentDir = path.resolve(`${__dirname}`, `../component/${COMPONENT}`);

mkdirp(componentDir).then(() => {
  const componentContent = `import React from 'react';
import PropTypes from 'prop-types';
import { handleSuccess, handleError, handleLoading } from '../services/handlerService';
import Wrapper from '../Wrapper/Wrapper';

const failureMsgDefault = {
  unSupported: '${COMPONENT} is not supporting in your device',
  error: 'Unable to fetch details from ${COMPONENT}',
};

function ${COMPONENT}({
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg: failureMsgProps,
  children,
}) {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const get${COMPONENT} = () => {

  };

  return (
    React.Children.map(children || 'PhoneBook', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
      onClick: get${COMPONENT},
    }))
  );
}

${COMPONENT}.isBrowserSupport = () => globalThis && true;

${COMPONENT}.propTypes = {
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

${COMPONENT}.defaultProps = {
  successCb: () => {},
  failureCb: () => {},
  loadingCb: () => {},
  successMsg: 'Phonebook details fetch Successfully',
  failureMsg: { ...failureMsgDefault },
};

export default Wrapper(${COMPONENT});
`;
  const IndexContent = `import ${COMPONENT} from './${COMPONENT}';

export { ${COMPONENT} };

export default ${COMPONENT};
`;

  const READMEContent = `## 1. Happy Flow 
#### a) Passing child




## 2. Success: successCb callBack Fn along with success msg





> [!Note]
> **successCb** will get an object contains the property **msgType**, **msg**, **data**

## 3. Failure: failureCb callBack Fn along with failure msg





> [!Note]
> **failureCb** will get an object contains the property **msgType**, **msg**

> [!Important]
Failure can happend due to multiple reasons, due to that reason **failureMsg** is an object having different kind of error property according to the error can occur in component

## 4. Failure: Device don't support the feature and you want to hide the feauture from User





> [!Note]
> if **showForever** props value is false, feature will be hidden in case of unSupported by the device

## 5. Combine with all props





  `;

  fs.writeFile((`${componentDir}/${COMPONENT}.js`), componentContent, () => {});
  fs.writeFile((`${componentDir}/index.js`), IndexContent, () => {});
  fs.writeFile((`${componentDir}/README.md`), READMEContent, () => {});
});
