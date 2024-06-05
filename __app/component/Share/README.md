# Share

The ```Share``` Component will help you to ```share``` ```Name```, ```Title``` and a ```link``` in your mobile apps like ```Gmail```, ```Whatsapp```, ```Twitter```, ```FB``` etc.


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=Share)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>Share</b> | :white_check_mark: Component | Can be used as Component |
| <b>share<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return Share Component
import Share from 'fe-pilot/Share';

<Share /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { Share, share } from 'fe-pilot/Share';

<Share /> // Used as a Component

share(); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { Share } from 'fe-pilot/Share';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <Share successCb={successCb} failureCb={failureCb}>
    Pass clickable element (button, anchor etc)  here to bind onClick event
  </Share>
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
    <td>title</td>
    <td>String</td>
    <td>Provide a title</td>
    <td></td>
  </tr>
    <tr>
    <td>description</td>
    <td>String</td>
    <td>Provide a Description</td>
    <td></td>
  </tr>
    <tr>
    <td>url</td>
    <td>String</td>
    <td>Provide a Link</td>
    <td></td>
  </tr>
</table>

