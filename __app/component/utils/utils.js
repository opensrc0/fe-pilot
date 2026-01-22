const getRandomInt = (max) => Math.floor(Math.random() * max);

const consoleColor = [
  'color: red',
  'color: green',
  'color: magenta',
];

export const browserDimensions = () => {
  const doc = globalThis.document;
  if (!doc) {
    return { width: undefined, height: undefined };
  }
  const docEl = doc.documentElement || {};
  const body = doc.body || {};
  return {
    width: globalThis.innerWidth || docEl.clientWidth || body.clientWidth,
    height: globalThis.innerHeight || docEl.clientHeight || body.clientHeight,
  };
};

export const IsValidUPI = (url = '') => (url.search(/upi:\/\/pay\?pa=/) !== -1);

export const getRandomColor = () => consoleColor[getRandomInt(consoleColor.length)];
