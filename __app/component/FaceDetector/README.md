# FaceDetector

A ```FaceDetector``` component is used to ```detect``` the ```face``` of ```users``` and draw a squrebox on the ```user's face```.


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=FaceDetector)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>FaceDetector</b> | :white_check_mark: Component | Can be used as Component |
| <b>faceDetector<b> | :x: Service | Can be used as Service |

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
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
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
      Default Values
  </th>
  <tr>
    <td>
      showForever
    </td>
    <td>Boolean</td>
    <td>To hide/remove unsupported feature, make it <b>false</b>.</td>
    <td>Default value is <b>true.</b></td>
  </tr>
</table>

### Child Component
<table>
  <th>
    Child
  </th>
  <th>
    Type
  </th>
  <th>
    Description
  </th>
  <tr>
    <td>FaceDetectorClose</td>
    <td>Element</td>
    <td><b>Onclick, Close</b> the <b>camera</b></td>
  </tr>
  <tr>
    <td>FaceDetectorFacing</td>
    <td>Element</td>
    <td>OnClick, Toggle the <b>camera</b> from <b>front</b> to <b>back</b> and vice versa.</td>
  </tr>
  <tr>
    <td>FaceDetectorFlash</td>
    <td>Element</td>
    <td>OnClick, Toggle the <b>flash</b> light of <b>camera</b></td>
  </tr>
<tr>
<td colspan="3">

```mermaid
graph TD;
    FaceDetector--->FaceDetectorClose;
    FaceDetector--->FaceDetectorFacing;
    FaceDetector--->FaceDetectorFlash;
```

</td>
</tr>
</table>
