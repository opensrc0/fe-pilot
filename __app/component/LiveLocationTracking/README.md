# LiveLocationTracking

A ```LiveLocationTracking``` component is used to track the ```current location``` of the ```user``` in the ```google map```. On ```food delivey``` app, we are ```tracking``` the ```location``` of ```delivery person```, in the same way we can implement in web as well.


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=LiveLocationTracking)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>LiveLocationTracking</b> | :white_check_mark: Component | Can be used as Component |
| <b>liveLocationTracking<b> | :x: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return LiveLocationTracking Component
import LiveLocationTracking from 'fe-pilot/LiveLocationTracking';

<LiveLocationTracking /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { LiveLocationTracking } from 'fe-pilot/LiveLocationTracking';

<LiveLocationTracking /> // Used as a Component

```

##### 3. Here's an example of a advanced usage:

```javascript
import { LiveLocationTracking } from 'fe-pilot/LiveLocationTracking';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <LiveLocationTracking
    successCb={successCb}
    failureCb={failureCb}
    googleKey="AIzaSyCimWLcCkTc03jZrTE6TxfTH0PauR2Keps"
    isProdKey={false}
    destinationLatLng={{ lat: 12.9541033, lng: 77.7091133 }}
  >
    Pass clickable element (button, anchor etc)  here to bind onClick event
  </LiveLocationTracking>
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
    <td>Default value is <b>true</b></td>
  </tr>
  <tr>
    <td>googleKey (*)</td>
    <td>String</td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>isProdKey (*)</td>
    <td>Boolean</td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>destinationLatLng (*)</td>
    <td>Object</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>mapTypeControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>panControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>zoomControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>scaleControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>streetViewControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>overviewMapControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>rotateControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>fullscreenControl</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>


