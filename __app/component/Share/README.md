# Share

  A short description about the component


  ## Demo

  A minimal [Online demo](link of codesandbox).


  ## Usage/Examples

  Here's an example of basic usage:
  ```javascript
  import { Share, share } from 'fe-pilot/Share';

  <Share /> // Used as a Component

  share(); // Used as a Service
  ```

  Here's an example of a advance usage:

  ```javascript
  import { Share } from 'fe-pilot/Share';

  const successCb = (response) => {
    console.log("success response:", response);
  }

  const failureCb = (response) => {
    console.log("failure response:", response);
  }

  return (
    <Share
      successCb={successCb}
      failureCb={failureCb}
      sName='fe-pilot'
      sTitle='A React library for advance JS features'
      sUrl='https://www.npmjs.com/package/fe-pilot'
    >
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
      <td>To hide unsupported feature from browser, make it <b>false</b>. Default value is <b>true</b></td>
      <td> <pre>---</pre> </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
     <tr>
      <td>sName</td>
      <td>String</td>
      <td></td>
      <td></td>
    </tr>
     <tr>
      <td>sTitle</td>
      <td>String</td>
      <td></td>
      <td></td>
    </tr>
     <tr>
      <td>sUrl</td>
      <td>String</td>
      <td></td>
      <td></td>
    </tr>
  </table>

