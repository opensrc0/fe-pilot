export const browserDimensions = () => ({
  width: globalThis.document && (
    window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth
  ),
  height: globalThis.document && (
    window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
  ),
});

export const saveLocal = () => {

};
