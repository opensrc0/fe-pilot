# WhatsappShare

A ```WhatsappShare``` component will help you to ```open whatsapp``` directly and ```share``` the ```message```. You can provide a ```pre-defined``` ```mobile number``` and share the details directly in a ```specific number``` as well.


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=WhatsappShare)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>WhatsappShare</b> | :white_check_mark: Component | Can be used as Component |
| <b>whatsappShare<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return WhatsappShare Component
import WhatsappShare from 'fe-pilot/WhatsappShare';

<WhatsappShare /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { WhatsappShare, whatsappShare } from 'fe-pilot/WhatsappShare';

<WhatsappShare /> // Used as a Component

whatsappShare(); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { WhatsappShare } from 'fe-pilot/WhatsappShare';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <WhatsappShare
    successCb={successCb}
    failureCb={failureCb}
    mobile="7204535372"
    msg="Welcome to fe-pilot"
  >
    Pass clickable element (button, anchor etc)  here to bind onClick event
  </WhatsappShare>
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
    <td>mobile</td>
    <td>number</td>
    <td>Provide a mobile number to open directly</td>
    <td> <pre>---</pre> </td>
  </tr>
    <tr>
    <td>msg</td>
    <td>String</td>
    <td>Provide a message to send to user</td>
    <td> <pre>---</pre> </td>
  </tr>
</table>

