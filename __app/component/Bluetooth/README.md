# Bluetooth

The Bluetooth component lets you request a nearby Bluetooth device using the Web Bluetooth API.

## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=Bluetooth)

## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>Bluetooth</b> | :white_check_mark: Component | Can be used as Component |
| <b>bluetooth<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return Bluetooth Component
import Bluetooth from 'fe-pilot/Bluetooth';

<Bluetooth /> // Used as a Component
```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { Bluetooth, bluetooth } from 'fe-pilot/Bluetooth';

<Bluetooth /> // Used as a Component

bluetooth({ acceptAllDevices: true }); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { Bluetooth } from 'fe-pilot/Bluetooth';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <Bluetooth
    successCb={successCb}
    failureCb={failureCb}
    filters={[{ services: ['battery_service'] }]}
    optionalServices={['device_information']}
  >
    Connect Bluetooth
  </Bluetooth>
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
    data: "BluetoothDevice",
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
      filters
    </td>
    <td>Array</td>
    <td>Filters passed to navigator.bluetooth.requestDevice.</td>
    <td>Optional</td>
  </tr>
  <tr>
    <td>
      optionalServices
    </td>
    <td>Array</td>
    <td>Optional services to request in addition to filters.</td>
    <td>Optional</td>
  </tr>
  <tr>
    <td>
      acceptAllDevices
    </td>
    <td>Boolean</td>
    <td>Set to true to request any device when filters are not provided.</td>
    <td>Default value is <b>false.</b></td>
  </tr>
</table>
