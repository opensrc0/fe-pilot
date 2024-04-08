## 1. Happy Flow

```js
import AutoFillOtp from "fe-pilot/AutoFillOtp";
```

#### a) Call AutoFillOtp function

```js
AutoFillOtp();
```

> [!Important]
> To work AutoFillOtp successfully, your otp message template should follow the below format.
> <br />
> ```Your OTP is 123456```
> <br/>
> ```@your-domain.com #123456```


## 2. Success: successCb callBack function definition

```js
const successCb = ({ msgType, msg, data, status }) => {
  console.log(msgType); // SUCCESSFUL
  console.log(msg); // Success OTP Autofill
  console.log(data); // logs - otp
  console.log(status); // SUCCESS
};

AutoFillOtp({
  successCb,
  successMsg: "Success OTP Autofill",
});
```

> [!Note]
> **successCb** function will get an object contains the property `msgType`, `msg`, `data`, `status`


## 3. Failure: failureCb callBack function definition

```js
const failureCb = ({ msgType, msg, status }) => {
  console.log(msgType); 
  console.log(msg); 
  console.log(status); 
  // UN_SUPPORTED_FEATURE ERROR
  // Your device does not support AutoFillOtp
  // FAILURE

  // ----------OR----------

  // ERROR
  // Unable to auto fill otp
  // FAILURE
};

AutoFillOtp({
  failureCb,
  failureMsg: {
    unSupported: "Your device does not support AutoFillOtp",
    error: "Unable to auto fill otp",
  },
});
```

> [!Note] 
> **failureCb** function will get an object contains the property `msgType`, `msg`, `status`

> [!Important]
> Failure can happend due to multiple reasons, due to that reason `failureMsg` is an object having different kind of error property according to the error can occur in component

## 4. Combine with all props

```js
AutoFillOtp({
  successCb,
  successMsg: "Success OTP Autofill",
  failureCb,
  failureMsg: {
    unSupported: "Your device does not support AutoFillOtp",
    error: "Unable to auto fill otp",
  },
});
```
