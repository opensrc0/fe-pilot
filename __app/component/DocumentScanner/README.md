# DocumentScanner

Built-in cropper for document scan: auto-detect edges, warp + crop, sharpen filter and PDF export.

## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=DocumentScanner)

## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>DocumentScanner</b> | :white_check_mark: Component | Can be used as Component |
| <b>documentScanner<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return DocumentScanner Component
import DocumentScanner from 'fe-pilot/DocumentScanner';

<DocumentScanner /> // Used as a Component
```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { DocumentScanner, documentScanner } from 'fe-pilot/DocumentScanner';

<DocumentScanner /> // Used as a Component

documentScanner({ src: '/id-card.jpg' }); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { DocumentScanner } from 'fe-pilot/DocumentScanner';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <DocumentScanner
    successCb={successCb}
    failureCb={failureCb}
    src="/id-card.jpg"
    autoDetect
    warp
    sharpenFilter
    thresholdFilter
    outputType="image"
  >
    Scan ID Card
  </DocumentScanner>
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
  data: { dataUrl, blob, corners },
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
  <tr>
    <td>
      image / file / dataUrl / src
    </td>
    <td>Any</td>
    <td>Image source for scanning. Provide at least one.</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>
      corners
    </td>
    <td>Array</td>
    <td>Manual 4-point crop. Format: [{x,y}, ...]</td>
    <td>Optional</td>
  </tr>
  <tr>
    <td>
      autoDetect
    </td>
    <td>Boolean</td>
    <td>Auto-detect edges and build crop corners.</td>
    <td>Default value is <b>true.</b></td>
  </tr>
  <tr>
    <td>
      warp
    </td>
    <td>Boolean</td>
    <td>Apply perspective warp + crop.</td>
    <td>Default value is <b>true.</b></td>
  </tr>
  <tr>
    <td>
      sharpenFilter
    </td>
    <td>Boolean</td>
    <td>Apply a sharpen filter for text clarity.</td>
    <td>Default value is <b>true.</b></td>
  </tr>
  <tr>
    <td>
      thresholdFilter
    </td>
    <td>Boolean</td>
    <td>Apply a black/white threshold filter.</td>
    <td>Default value is <b>false.</b></td>
  </tr>
  <tr>
    <td>
      outputType
    </td>
    <td>String</td>
    <td>image | pdf</td>
    <td>Default value is <b>image.</b></td>
  </tr>
</table>
