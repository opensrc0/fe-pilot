## 1. Happy Flow 

#### a) Passing string for copy

```js
<CopyToClipboard 
  elementToBeCopy="Fe-pilot library offers component like scanner, voice search, autofill otp, phonebook, share and many more for a small/medium/large size web based applications" 
/>
```

#### b) Passing element for copy

```js
<CopyToClipboard 
  elementToBeCopy={`
    <div>
      <CopyToClipboard />
    <div>
  `} 
/>
```
> [!Tip]
> You can also pass ref variable


#### c) Passing child

```js
<CopyToClipboard 
  elementToBeCopy={`
    <div>
      <CopyToClipboard />
    <div>
  `} 
>
  Click Me to Copy
</CopyToClipboard> 
```

## 2. Success: successCb callBack Fn along with success msg

```js
const successCb = ({ msgType, msg, data }) => {
  console.log(msgType); // Success
  console.log(msg);     // Copied Successfully
  console.log(data);    // Fe-pilot library offers component like scanner, voice search, autofill otp, phonebook, share
}
```

```js
<CopyToClipboard 
  elementToBeCopy={`Fe-pilot library offers component like scanner, voice search, autofill otp, phonebook, share`}
  successCb={successCb}
  successMsg="Copied Successfully"
/>
```
> [!Note]
> Define **successCb** fn and your will get an object in param contains the property ```msgType```, ```msg```, ```data```

## 3. Failure: failureCb callBack Fn along with failure msg
```js
const failureCb = ({ msgType, msg }) => {
  console.log(msgType); // UN_SUPPORTED_FEATURE
  console.log(msg);     // Your device is not supporting Copy feature

  OR

  console.log(msgType); // ERROR
  console.log(msg);     // Unable to copy the text
}
```
```js
<CopyToClipboard 
  elementToBeCopy={`Fe-pilot library offers component like scanner, voice search, autofill otp, phonebook, share`}
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your device is not supporting Copy feature',
    error: 'Unable to copy the text',
  }}
/>
```
> [!Note]
> Define **failureCb** fn and your will get an object in param contains the property ```msgType```, ```msg```

> [!Important]
Failure can happend due to multiple reasons, due to that reason ```failureMsg``` is an object having different kind of error property according to the error can occur in component

## 4. Failure: Device don't support the feature and you want to hide the feauture from User
```js
<CopyToClipboard 
  elementToBeCopy={`Fe-pilot library offers component like scanner, voice search, autofill otp, phonebook, share`}
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your device is not supporting Copy feature',
    error: 'Unable to copy the text',
  }}
  showForever={false}
/>
```
> [!Note]
> ```showForever``` props will false, feature will be hidden in case of unSupported by the device

## 5. Combine with all props
```js
<CopyToClipboard 
  elementToBeCopy={`Fe-pilot library offers component like scanner, voice search, autofill otp, phonebook, share`}
  successCb={successCb}
  successMsg="Copied Successfully"
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'Your device is not supporting Copy feature',
    error: 'Unable to copy the text',
  }}
  showForever={false}
>
  Pass Copy Icon to Copy Element/String
</CopyToClipboard>
```