# NetworkMonitor

A Network Monitor Component returns online status and also information about the system's connection in terms of general connection type (e.g., 'Wi-Fi, 'cellular', etc.). Which can be used to select high-definition content or low-definition content based on the user's connection.

## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=NetworkMonitor)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>NetworkMonitor</b> | :white_check_mark: Component | Can be used as Component |
| <b>networkMonitor<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Default Import:
```javascript
// Default import will return NetworkMonitor Component
import NetworkMonitor from 'fe-pilot/NetworkMonitor';

<NetworkMonitor /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import:
```javascript
import { NetworkMonitor, networkMonitor } from 'fe-pilot/NetworkMonitor';

<NetworkMonitor /> // Used as a Component

networkMonitor(); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { NetworkMonitor } from 'fe-pilot/NetworkMonitor';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <NetworkMonitor successCb={successCb} failureCb={failureCb}>
    Pass clickable element (button, anchor etc)  here to bind onClick event
  </NetworkMonitor>
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

### Child
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
    <td>OfflineToast</td>
    <td>Element/String/Number</td>
    <td>A offline toast, will be appear as user goes offline</td>
  </tr>
  <tr>
    <td>OnlineToast</td>
    <td>Element/String/Number</td>
    <td>A online toast, will be appear as user goes from offline to online</td>
  </tr>
</table>
