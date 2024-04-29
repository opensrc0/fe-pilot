## WakeLock Service Documentation

The WakeLock service provides functionality to manage WakeLock for preventing the screen from sleeping.

## Usage

### 1. Apply WakeLock

```js
import WakeLockService from 'path/to/WakeLockService';

// Apply WakeLock
WakeLockService();
```

## 2. Success: successCb callBack Fn along with success msg

```js
const successCb = ({ msgType, msg, data }) => {
  console.log(msgType); // Success
  console.log(msg);     // WakeLock successfully applied!
}

WakeLockService({ successCb });
```
> [!Note]
> **successCb** will get an object contains the property ```msgType```, ```msg```, ```data```

## 3. Failure: failureCb callBack Fn along with failure msg
```js
const failureCb = ({ msgType, msg }) => {
  console.log(msgType);  // UN_SUPPORTED_FEATURE or ERROR
  console.log(msg);      // Corresponding error message
}

WakeLockService({ failureCb });

```

## 4. Combine with Callbacks and Messages

```js
WakeLockService({
  successCb,
  successMsg: "WakeLock successfully applied!",
  failureCb,
  failureMsg: {
    unSupported: 'Your browser does not support the WakeLock feature',
    error: 'Unable to apply WakeLock',
  }
});

```
