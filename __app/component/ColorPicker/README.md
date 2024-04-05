## 1. Happy Flow 


#### a) Passing child

```js
<ColorPicker 
  successCb={successCb}
  successMsg="Color copied successfully!!"
>
  Pass clickable(button, anchor etc) element here to bind onClick event
</ColorPicker> 
```

## 2. Success: successCb callBack Fn along with success msg

```js
const successCb = ({ msgType, msg, data }) => {
  console.log(msgType); // Success
  console.log(msg);     // Color copied successfully!!
  console.log(data);   // #FFFFFF (Color Code)
}

<ColorPicker 
  successCb={successCb}
  successMsg="Color copied successfully!!"
>
  <button type="button">Click here to start Color Picker</button>
</ColorPicker>
```
> [!Note]
> **successCb** will get an object contains the property ```msgType```, ```msg```, ```data```

## 3. Failure: failureCb callBack Fn along with failure msg
```js
const failureCb = ({ msgType, msg }) => {
  console.log(msgType); // UN_SUPPORTED_FEATURE
  console.log(msg);     // Your device is not supporting Color Picker feature

  OR

  console.log(msgType); // ERROR
  console.log(msg);     // Unable to copy color code
}
```
```js
<ColorPicker 
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your device is not supporting Color Picker feature',
    error: 'Unable to copy color code',
  }}
>
  <button type="button">Click here to start Color Picker</button>
</ColorPicker>
```
> [!Note]
> **failureCb** will get an object contains the property ```msgType```, ```msg```

> [!Important]
Failure can happend due to multiple reasons, due to that reason ```failureMsg``` is an object having different kind of error property according to the error can occur in component

## 4. Failure: Device don't support the feature and you want to hide the feauture from User
```js
<ColorPicker 
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your device is not supporting Color Picker feature',
    error: 'Unable to copy color code',
  }}
  showForever={false}
>  
  <button type="button">Click here to start Color Picker</button>
</ColorPicker>
```
> [!Note]
> if ```showForever``` props value is false, feature will be hidden in case of unSupported by the device

## 5. Combine with all props
```js
<ColorPicker 
  successCb={successCb}
  successMsg="Color copied successfully!!"
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your device is not supporting Color Picker feature',
    error: 'Unable to copy color code',
  }}
  showForever={false}
>
  <button type="button">Click here to start Color Picker</button>
</ColorPicker>
```