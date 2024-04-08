/* eslint-disable no-console */
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const color = [
  { name: 'FgRed', value: '\x1b[31m%s\x1b[0m' },
  { name: 'FgGreen', value: '\x1b[32m%s\x1b[0m' },
  { name: 'FgYellow', value: '\x1b[33m%s\x1b[0m' },
  { name: 'FgMagenta', value: '\x1b[35m%s\x1b[0m' },
  { name: 'FgCyan', value: '\x1b[36m%s\x1b[0m' },
];

// generate exports for all platforms
const srcPath = path.resolve(__dirname, '../component');
const components = fs.readdirSync(srcPath).filter((files) => !ignoreFiles.includes(files) && !files.includes('WIP-'));
let count = 0;

let indexImport = '';
let indexExport = '\nexport {';
components.forEach((component) => {
  indexImport += `import ${component} from './${component}';\n`;
  indexExport += `\n  ${component},`;
  const componentDir = path.resolve(`${__dirname}`, `../../${component}`);
  mkdirp(componentDir).then(() => {
    const componentFile = path.resolve(componentDir, 'index.js');
    const componentContent = `export { default } from '../__build/${component}';\nexport * from '../__build/${component}';\n`;
    // const componentContent = `import ${component}
    // from '../__build/${component}/${component}';\nexport default ${component};\n`;
    fs.writeFile(componentFile, componentContent, (writeFileErr) => {
      if (writeFileErr) throw writeFileErr;
      console.log(color[getRandomInt(color.length)].value, ` ${count + 1}. generated: ${componentFile} \n`);
      count += 1;
      if (count === components.length) {
        // console.log(color[0].value, ' \n Completed: Index files direct import of Package \n');
        console.log('===============================================================================');
        console.log('\x1b[44m%s\x1b[0m', 'Final: Setup Completed Successfully');
        console.log('===============================================================================');
        console.log('');
      }
    });
  });
});
indexExport += '\n};\n';
fs.writeFile(('index.js'), indexImport + indexExport, () => {});
