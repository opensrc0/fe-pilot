# Scanner

A ```Scanner``` component is used to scan any ```QR code```, ```Bar Code```, ```UPI QR Code```. The component will also provide you the feature like ```flash light```, ```Toggle camera```.


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=Scanner)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>Scanner</b> | :white_check_mark: Component | Can be used as Component |
| <b>scanner<b> | :x: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return Scanner Component
import Scanner from 'fe-pilot/Scanner';

<Scanner /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { Scanner, scanner } from 'fe-pilot/Scanner';

<Scanner /> // Used as a Component

```

##### 3. Here's an example of a advanced usage:

```javascript
import { Scanner } from 'fe-pilot/Scanner';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
 <Scanner successCb={successCb} failureCb={failureCb}>
  <ScannerFlash />
  <ScannerScanBox />
  <ScannerFacing />
  <ScannerClose
    onClose={onClose}
  >
    ❎ Close
  </ScannerClose>
</Scanner>
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
    <td>ScannerClose</td>
    <td>Element</td>
    <td><b>Close</b> the <b>camera</b></td>
  </tr>
  <tr>
    <td>ScannerFacing</td>
    <td>Element</td>
    <td>Toggle the <b>camera</b> from <b>front</b> to <b>back</b> and vice versa.</td>
  </tr>
  <tr>
    <td>ScannerFlash</td>
    <td>Element</td>
    <td>Toggle the <b>flash</b> light of <b>camera</b></td>
  </tr>
   <tr>
    <td>ScannerScanBox</td>
    <td>Element</td>
    <td>Create a <b>box area</b> used for <b>scanning</b></td>
  </tr>
</table>

