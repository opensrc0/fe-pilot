## 1. Happy Flow
#### a) Passing child
<TextToSpeech>
  <TextToSpeechStart>
    Start Icon/Text/Element
  </TextToSpeechStart>
  <TextToSpeechStop>
    Stop Icon/Text/Element
  </TextToSpeechStop>
</TextToSpeech>



## 2. Success: successCb callBack Fn along with success msg





> [!Note]
> **successCb** will get an object contains the property **msgType**, **msg**, **data**

## 3. Failure: failureCb callBack Fn along with failure msg





> [!Note]
> **failureCb** will get an object contains the property **msgType**, **msg**

> [!Important]
Failure can happend due to multiple reasons, due to that reason **failureMsg** is an object having different kind of error property according to the error can occur in component

## 4. Failure: Device don't support the feature and you want to hide the feauture from User





> [!Note]
> if **showForever** props value is false, feature will be hidden in case of unSupported by the device

## 5. Combine with all props


```mermaid
graph TD;
    TextToSpeech--->TextToSpeechInit;
    TextToSpeech--->TextToSpeechStart;
    TextToSpeech--->TextToSpeechStop;
```


