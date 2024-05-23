// console.log('Boiler Plate');
// console.log(process.env.COMPONENT);
const fs = require('fs');
const path = require('path');
const { mkdirp } = require('mkdirp');

const ignoreFiles = [
  '.DS_Store',
  'scripts',
  'utils',
  'WIP-',
  'services',
  'Wrapper',
];
// generate exports for all platforms
const srcPath = path.resolve(__dirname, '../component');

const COMPONENT = process.env.npm_config_component;
const COMPONENT_SERVICE = COMPONENT[0].toLowerCase() + COMPONENT.substring(1);
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

const isBrowserSupport = () => globalThis;

const ${COMPONENT_SERVICE} = ({
  successCb = () => {},
  failureCb = () => {},
  loadingCb = () => {},
  successMsg = 'Successfully!!',
  failureMsg: failureMsgProps = { ...failureMsgDefault },
} = {}) => {
  const failureMsg = { ...failureMsgDefault, ...failureMsgProps };

  const init = () => {
    if (isBrowserSupport()) {
      handleLoading({ loadingCb });

      // Your Code will start from here

      // Your Code will end here
    } else {
      return handleError({ msgType: 'UN_SUPPORTED_FEATURE', msg: failureMsg.unSupported, failureCb });
    }
    return true;
  };

  init();
};

function ${COMPONENT}({
  children,
  successCb,
  failureCb,
  loadingCb,
  successMsg,
  failureMsg,
  ...props
}) {
  return React.Children.map(children || '${COMPONENT}', (child) => React.cloneElement(typeof child === 'string' ? <span>{child}</span> : child, {
    onClick: () => ${COMPONENT_SERVICE}({
      successCb,
      failureCb,
      loadingCb,
      successMsg,
      failureMsg,
      ...props,
    }),
  }));
}

${COMPONENT}.propTypes = {
  showForever: PropTypes.bool,
  successCb: PropTypes.func,
  failureCb: PropTypes.func,
  loadingCb: PropTypes.func,
  successMsg: PropTypes.string,
  failureMsg: PropTypes.object,
};

const W${COMPONENT} = Wrapper(${COMPONENT}, isBrowserSupport);

export { ${COMPONENT_SERVICE}, W${COMPONENT} as ${COMPONENT} };

export default W${COMPONENT};
`;
  const IndexContent = `export * from './${COMPONENT}';
export { default } from './${COMPONENT}';
`;

  const READMEContent = `
# {component name}

A short description about the component


## Demo

A minimal [Online demo](link of codesandbox).


## Usage/Examples

Here's an example of basic usage:

\`\`\`javascript

\`\`\`

Here's an example of a complex usage:

\`\`\`javascript

\`\`\`

## User guide

### Props

| Prop name  | Description        | Type     | Default value    | Universal          |
| ---------- | ------------------ | -------- | ---------------- | ------------------ |
| showForever|                    | Boolean  |                  | :white_check_mark: |
| loadingCb  |                    | function |                  | :white_check_mark: |
| successCb  |                    | function |                  | :white_check_mark: |
| failureCb  |                    | function |                  | :white_check_mark: |
| successMsg |                    | String   |                  | :white_check_mark: |
| failureMsg |                    | Object   |                  | :white_check_mark: |

  `;

  fs.writeFile((`${componentDir}/${COMPONENT}.js`), componentContent, () => {});
  fs.writeFile((`${componentDir}/index.js`), IndexContent, () => {
    const components = fs.readdirSync(srcPath).filter((files) => !ignoreFiles.includes(files) && !files.includes('WIP-'));
    let rootIndexImport = '';
    let rootIndexExport = '\nexport {\n';
    components.forEach((component) => {
      rootIndexImport += `import ${component} from './${component}';\n`;
      rootIndexExport += `  ${component},\n`;
    });

    rootIndexExport += '};\n';
    fs.writeFile((path.resolve(`${__dirname}`, '../../index.js')), rootIndexImport + rootIndexExport, () => {});

    // Readme Github File Modification
    const readMeGitHub = fs.readFileSync((path.resolve(`${__dirname}`, '../../.github/README.md'))).toString();

    const updatedReadMeGitHub = readMeGitHub.replace('> </details>', `>  00. :white_check_mark: &nbsp; [${COMPONENT}](https://github.com/opensrc0/fe-pilot/blob/main/__app/component/${COMPONENT}/README.md)
> </details>`);
    fs.writeFile(path.resolve(`${__dirname}`, '../../.github/README.md'), updatedReadMeGitHub, () => {});

    // Readme NPM File Modification
    const readMeNpm = fs.readFileSync((path.resolve(`${__dirname}`, '../../README.md'))).toString();

    const updatedReadMeNpm = readMeNpm.replace('</details>', `${parseInt(components.length, 10)}. :white_check_mark: &nbsp; [${COMPONENT}](https://github.com/opensrc0/fe-pilot/blob/main/__app/component/${COMPONENT}/README.md)
</details>`);
    fs.writeFile(path.resolve(`${__dirname}`, '../../README.md'), updatedReadMeNpm, () => {});
  });
  fs.writeFile((`${componentDir}/README.md`), READMEContent, () => {});
});
