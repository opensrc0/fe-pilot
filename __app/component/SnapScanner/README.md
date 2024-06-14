# SnapScanner

A SnapScanner is used to scan any ```QR code```, ```Bar Code```, ```UPI QR Code``` from an image. You just need to pass an ```image```, the component will ```scan``` the ```image``` and provide you the ```QR code ID```, ```Bar code ID``` or ```UPI ID```


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=SnapScanner)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>SnapScanner</b> | :white_check_mark: Component | Can be used as Component |
| <b>snapScanner<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return SnapScanner Component
import SnapScanner from 'fe-pilot/SnapScanner';

<SnapScanner /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { SnapScanner, snapScanner } from 'fe-pilot/SnapScanner';

<SnapScanner /> // Used as a Component

snapScanner(); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { SnapScanner } from 'fe-pilot/SnapScanner';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <SnapScanner successCb={successCb} failureCb={failureCb}>
    Pass clickable element (button, anchor etc)  here to bind onClick event
  </SnapScanner>
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
  <tr>
    <td>
      via
    </td>
     <td>String</td>
    <td>To open <b>gallary/Phone Camera/File System</b></td>
    <td>Default value is <b>gallery</b>. Possible values are <b>gallary/camera/phone</b></td>
  </tr>
</table>

