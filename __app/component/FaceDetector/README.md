# FaceDetector

A short description about the component


## Demo

A minimal [Online demo](link of codesandbox).


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>FaceDetector</b> | Component :white_check_mark: | Can be used as Component |
| <b>faceDetector<b> |  Service :x: | Can't be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return FaceDetector Component
import FaceDetector from 'fe-pilot/FaceDetector';

<FaceDetector /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { FaceDetector } from 'fe-pilot/FaceDetector';

<FaceDetector /> // Used as a Component

```

##### 3. Here's an example of a advanced usage:

```javascript
import { FaceDetector } from 'fe-pilot/FaceDetector';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

const onClose = (response) => {
  console.log("onclose response:", response);
}

return (
  <FaceDetector
    successCb={successCb} failureCb={failureCb}
  >
    <FaceDetectorClose
      onClose={onClose}
    >
      ❎ Close
    </FaceDetectorClose>
    <FaceDetectorFlash>⚡ Flash</FaceDetectorFlash>
    <FaceDetectorFacing>🔄 Toggle </FaceDetectorFacing>
  </FaceDetector>
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

