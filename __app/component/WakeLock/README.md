## WakeLock Component Documentation

### 1. Happy Flow 

```jsx
<WakeLock />
```

## 2. Success: successCb callBack Fn along with success msg

```js
const successCb = ({ msgType, msg, data }) => {
  console.log(msgType); // Success
  console.log(msg);     // WakeLock successfully applied!
}

<WakeLock 
  successCb={successCb}
  successMsg="WakeLock successfully applied!"
>
</WakeLock>
```
> [!Note]
> **successCb** will get an object contains the property ```msgType```, ```msg```, ```data```

## 3. Failure: failureCb callBack Fn along with failure msg
```js
const failureCb = ({ msgType, msg }) => {
  console.log(msgType);  // UN_SUPPORTED_FEATURE or ERROR
  console.log(msg);      // Corresponding error message

  OR

  console.log(msgType); // ERROR
  console.log(msg);     // Unable to copy wakelock code
}
```
```js
<WakeLock 
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your browser does not support the WakeLock feature',
    error: 'Unable to apply WakeLock',
  }}
>
</WakeLock>
```
[!Note]
failureCb will receive an object containing the properties msgType and msg.

[!Important]
Failure can occur due to multiple reasons, hence the failureMsg object contains different error properties according to the possible errors in the component.


## 5. Combine with all props
```js
<WakeLock 
  successCb={successCb}
  successMsg="WakeLock successfully applied!"
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your browser does not support the WakeLock feature',
    error: 'Unable to apply WakeLock',
  }}
>
</WakeLock>
```