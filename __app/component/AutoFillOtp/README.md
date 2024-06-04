# AutoFillOtp

  An ```AutoFillOTP``` component will help you to enable a listener. The listner will wait for the ```SMS``` in ```your phone``` to enable autoFillOTP.

  Also, Our ```SMS``` should follow a format. To use auto fill OTP, our sms last line should contain

  ```javascript
  @your-domain.com #12345
```

  ## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>AutoFillOtp</b> | :white_check_mark: Component | Can be used as Component |
| <b>autoFillOtp<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Default Import:
 ```javascript
  // Default import will return AutoFillOtp Component
  import AutoFillOtp from 'fe-pilot/AutoFillOtp';

  <AutoFillOtp /> // Used as a Component
  ```

##### 2. Here's an example of basic usage with Multiple Import:
  ```javascript
  import { AutoFillOtp, autoFillOtp } from 'fe-pilot/AutoFillOtp'; // Multi Export

  <AutoFillOtp /> // Used as a Component

  autoFillOtp(); // Used as a Service
  ```

##### 3. Here's an example of a advanced usage:

  ```javascript
  import { autoFillOtp } from 'fe-pilot/AutoFillOtp';

  const successCb = (response) => {
    console.log("success response:", response);
  }

  const failureCb = (response) => {
    console.log("failure response:", response);
  }

  autoFillOtp({
    successCb
    failureCb
  });

  ```

> [!Important]
> To work AutoFillOtp successfully, your otp message template should follow the below format.
> <br />
> <br />
> ```Your OTP is 123456```
> <br/>
> ```@your-domain.com #123456```

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

