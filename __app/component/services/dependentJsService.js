const dependentService = async (
  FILE_URL,
  scriptId,
  isAsync = true,
) => new Promise((resolve, reject) => {
  if (!document.getElementById(scriptId)) {
    const scriptEle = document.createElement('script');
    scriptEle.setAttribute('src', FILE_URL);
    scriptEle.setAttribute('id', scriptId);
    scriptEle.setAttribute('type', 'text/javascript');
    scriptEle.setAttribute('async', isAsync);
    document.body.appendChild(scriptEle);
    scriptEle.addEventListener('load', () => { resolve(1); });
    scriptEle.addEventListener('error', () => {
      reject();
    });
  } else {
    resolve(1);
  }
});

export default dependentService;
