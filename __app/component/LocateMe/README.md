# LocateMe

A ```LocateMe``` component will be used to get the ```current pincode``` of the user using ```google map api```. 


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=LocateMe)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>LocateMe</b> | :white_check_mark: Component | Can be used as Component |
| <b>locateMe<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return LocateMe Component
import LocateMe from 'fe-pilot/LocateMe';

<LocateMe
  googleKey="Require Google Map Key"
  isProdKey={false}
/> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { LocateMe, locateMe } from 'fe-pilot/LocateMe';

<LocateMe
  googleKey="Require Google Map Key"
  isProdKey={false}
/> // Used as a Component

locateMe({
  googleKey="Require Google Map Key"
  isProdKey={false}
}); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { LocateMe } from 'fe-pilot/LocateMe';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
 <LocateMe
    successCb={successCb}
    failureCb={failureCb}
    googleKey="Require Google Map Key"
    isProdKey={false}
  >
    Pass clickable element (button, anchor etc)  here to bind onClick event
  </LocateMe>
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
  <tr>
    <td>googleKey(*)</td>
    <td>String</td>
    <td>Provide a googleKey for prod/lower-env</td>
    <td></td>
  </tr>
    <tr>
    <td>isProdKey(*)</td>
    <td>Boolean</td>
    <td>For <b>non-production</b> google key make it <b>false</b>, default is <b>true</b></td>
    <td></td>
  </tr>
</table>

