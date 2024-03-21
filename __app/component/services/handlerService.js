export const handleSuccess = ({ disbaleToast, msg, msgType, successCb, data }) => {
  console.log(`%c${msgType} : %s`, 'color: green; font-size: 20px', '', data);
  if (!disbaleToast && msg) console.log(`%c${msgType} : %c${data}`, 'color: green; font-size: 20px', 'color: #4a004e; font-size: 20px');
  successCb({
    msgType,
    msg,
    data,
    status: 'SUCCESS',
  });
};

export const handleError = ({ disbaleToast, msg, msgType, failureCb }) => {
  console.log(`%c${msgType} : %s`, 'color: green; font-size: 20px', '', msg);
  if (!disbaleToast && msg) console.log(`%c${msgType} : %c${msg}`, 'color: green; font-size: 20px', 'color: #4a004e; font-size: 20px');
  failureCb({
    msgType,
    msg,
    status: 'FAILURE',
  });

  return false;
};
