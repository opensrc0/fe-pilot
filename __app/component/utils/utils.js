const getRandomInt = (max) => Math.floor(Math.random() * max);

const consoleColor = [
  'color: red',
  'color: green',
  'color: magenta',
];

export const browserDimensions = () => ({
  width: globalThis.document && (
    globalThis.innerWidth
    || globalThis.document.documentElement.clientWidth
    || globalThis.document.body.clientWidth
  ),
  height: globalThis.document && (
    globalThis.innerHeight
    || globalThis.document.documentElement.clientHeight
    || globalThis.document.body.clientHeight
  ),
});

export const IsValidUPI = (url = '') => (url.search(/upi:\/\/pay\?pa=/) !== -1);

export const getRandomColor = () => consoleColor[getRandomInt(consoleColor.length)];
