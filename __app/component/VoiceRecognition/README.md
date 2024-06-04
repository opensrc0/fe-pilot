# VoiceRecognition

A short description about the component


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=VoiceRecognition)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>VoiceRecognition</b> | :white_check_mark: Component | Can be used as Component |
| <b>voiceRecognition<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return VoiceRecognition Component
import VoiceRecognition from 'fe-pilot/VoiceRecognition';

<VoiceRecognition /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { VoiceRecognition, voiceRecognition } from 'fe-pilot/VoiceRecognition';

<VoiceRecognition /> // Used as a Component

voiceRecognition(); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { VoiceRecognition } from 'fe-pilot/VoiceRecognition';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <VoiceRecognition successCb={successCb} failureCb={failureCb}>
    <VoiceRecognitionIcon>
      Voice Icon
    </VoiceRecognitionIcon>
    <VoiceRecognitionModal>
      <div className="blink_me">...Listening, Please say something</div>
    </VoiceRecognitionModal>
  </VoiceRecognition>
);

```

### Props

<table>
  <tr>
    <th>
      Props
    </th>
    <th>
      Type
    </th>
    <th>
      Description
    </th>
    <th>
      Response
    </th>
  </tr>
  <tr>
    <td>
        successCb
    </td>
    <td>Function</td>
    <td> It will be called on success</td>
    <td>
      <pre>
{
    data: "Can be array/object/string/number",
    msgType: "SUCCESSFUL",
    msg: "A success msg",
    status: "SUCCESS"
}
      </pre>
    </td>
  </tr>
  <tr>
    <td>
        loadingCb
    </td>
    <td>Function</td>
    <td>
      It will be called before success/failure.
    </td>
    <td>
      <pre>
{
  msgType: "LOADING",
  msg: "LOADING...",
  status: "LOADING"
}
</pre>
    </td>
  </tr>
  <tr>
    <td>
        failureCb
    </td>
    <td>Function</td>
    <td>
      It will be called on failure
    </td>
    <td>
       <pre>
{
  msgType: "ERROR",
  msg: "A failed msg",
  status: "FAILURE"
}
       </pre>
    </td>
  </tr>
   <tr>
    <td>
        showForever
    </td>
     <td>Boolean</td>
    <td>To hide/remove unsupported feature, make it <b>false</b>. Default value is <b>true</b></td>
    <td> <pre>---</pre> </td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

