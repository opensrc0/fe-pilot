export const handleSuccess = ({ msg, msgType, successCb, data }) => {
  const rtn = {
    msgType,
    msg,
    data,
    status: 'SUCCESS SUCCESS SUCCESS SUCCESS SUCCESS SUCCESS SUCCESS',
  };
  console.table('%c SUCCESS::%s', 'color: green; font-size: 20px', '', rtn);
  successCb(rtn);
};

export const handleError = ({ msg, msgType, failureCb }) => {
  const rtn = {
    msgType,
    msg,
    status: 'FAILURE',
  };
  console.table('%c FAILURE::%s', 'color: red; font-size: 20px', '', rtn);
  failureCb(rtn);

  return false;
};

export const handleLoading = ({ loadingCb }) => {
  const rtn = {
    msgType: 'LOADING',
    msg: 'Loading...',
    status: 'LOADING',
  };

  console.table('%c Loading::%s', 'color: green; font-size: 20px', '', rtn);
  loadingCb(rtn);
};
