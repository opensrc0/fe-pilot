# Vibrate

A Component will be used to ```vibrate``` the ```mobile device```. We would like to ```notify``` user after the successful transaction, is an use case.

## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=Vibrate)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>Vibrate</b> | :white_check_mark: Component | Can be used as Component |
| <b>vibrate<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return Vibrate Component
import Vibrate from 'fe-pilot/Vibrate';

<Vibrate /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { Vibrate, vibrate } from 'fe-pilot/Vibrate';

<Vibrate /> // Used as a Component

vibrate(); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { Vibrate } from 'fe-pilot/Vibrate';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

vibrate({ successCb failureCb });
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
    Default Values
  </th>
  </tr>
  <tr>
    <td>
        showForever
    </td>
     <td>Boolean</td>
    <td>To hide/remove unsupported feature, make it <b>false</b>.</td>
    <td>Default value is <b>true</b>.</td>
  </tr>
  <tr>
    <td>vibrationSeq</td>
    <td>Array</td>
    <td>Provides a pattern of vibration and pause intervals. Each value indicates a number of milliseconds to vibrate or pause, in alternation. You may provide either a single value (to vibrate once for that many milliseconds) or an array of values to alternately vibrate, pause, then vibrate again</td>
    <td>[100, 30, 100, 30, 100, 30, 200, 30, 200, 30]</td>
  </tr>
</table>

