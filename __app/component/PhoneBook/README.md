## 1. Happy Flow 

#### a) Including PhoneBook Component
```js
<PhoneBook />
```

#### b) Passing contactProperty pros to the PhoneBook Component
```js
<PhoneBook 
  contactProperty={['name', 'email', 'tel', 'address', 'icon']},
/>
```
> [!Note]
> Prop contactProperty will be an array and it can contains 5 value. These 5 value are optional, you can pass either the single/two/three/four/five values.

#### c) Passing isSelectMultiple pros to the PhoneBook Component
```js
<PhoneBook 
  isSelectMultiple={true}
/>
```
> [!Note]
> You can select multiple phone numbers from phonebook directory.


#### d) Passing child

```js
<PhoneBook>
  Pass PhoneBook Icon here
</PhoneBook>
```

## 2. Success: successCb callBack Fn along with success msg

```js
const successCb = ({ msgType, msg, data }) => {
  console.log(msgType); // Success
  console.log(msg);     // Copied Successfully
  console.log(data);    // data will be an array of object
}
```
> [!Tip]
> <details>
>  <summary>date</summary>
>
>  ### 
>  [
>     {
>        'name': 'fe-pilot',
>        'email': 'opensrc0',
>        'tel': "7204535372", 
>        'address': "Dubai"
>     }
>  ]

```js
<PhoneBook 
  successCb={successCb}
  successMsg="Details selected Successfully"
/>
```
> [!Note]
> Define **successCb** fn and your will get an object in param contains the property ```msgType```, ```msg```, ```data```

## 3. Failure: failureCb callBack Fn along with failure msg
```js
const failureCb = ({ msgType, msg }) => {
  console.log(msgType); // UN_SUPPORTED_FEATURE
  console.log(msg);     // PhoneBook is not supporting in your device

  OR

  console.log(msgType); // CANCELLED
  console.log(msg);     // Feature Cancelled

  OR

  console.log(msgType); // ERROR
  console.log(msg);     // Unable to fetch details from PhoneBook
}
```
```js
<PhoneBook 
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'PhoneBook is not supporting in your device',
    cancelled: 'Feature Cancelled',
    error: 'Unable to fetch details from PhoneBook',
  }}
/>
```
> [!Note]
> Define **failureCb** fn and you will get an object in param contains the property ```msgType```, ```msg```

> [!Important]
Failure can happend due to multiple reasons, due to that reason ```failureMsg``` is an object having different kind of error property according to the error can occur in component

## 4. Failure: Device don't support the feature and you want to hide the feauture from User
```js
<PhoneBook 
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'PhoneBook is not supporting in your device',
    cancelled: 'Feature Cancelled',
    error: 'Unable to fetch details from PhoneBook',
  }}
  showForever={false}
/>
```
> [!Note]
> ```showForever``` props will false, feature will be hidden in case of unSupported by the device


## 5. Combine with all props
```js
<PhoneBook 
  successCb={successCb}
  successMsg="Details selected Successfully"
  failureCb={failureCb}
  failureMsg={{
    unSupported: 'PhoneBook is not supporting in your device',
    cancelled: 'Feature Cancelled',
    error: 'Unable to fetch details from PhoneBook',
  }}
  showForever={false}
  contactProperty={['name', 'email', 'tel', 'address', 'icon']},
  isSelectMultiple={true},
>
  Pass PhoneBook Icon here
</PhoneBook>
```