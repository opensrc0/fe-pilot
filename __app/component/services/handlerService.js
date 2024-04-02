export const handleSuccess = ({ msg, msgType, successCb, data }) => {
  console.log(`%c${msgType} : %s`, 'color: green; font-size: 20px', '', data);
  successCb({
    msgType,
    msg,
    data,
    status: 'SUCCESS',
  });
};

export const handleError = ({ msg, msgType, failureCb }) => {
  console.log(`%c${msgType} : %s`, 'color: green; font-size: 20px', '', msg);
  failureCb({
    msgType,
    msg,
    status: 'FAILURE',
  });

  return false;
};

export const handleLoading = ({ loadingCb }) => {
  loadingCb({
    msgType: 'LOADING',
    msg: 'Loading...',
    status: 'LOADING',
  });
};
