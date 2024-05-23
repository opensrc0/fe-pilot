# CopyToClipboard

  A short description about the component


  ## Demo

  A minimal [Online demo](link of codesandbox).


  ## Usage/Examples

  Here's an example of basic usage:
  ```javascript
  import { CopyToClipboard, copyToClipboard } from 'fe-pilot/CopyToClipboard';

  // Used as a Component
  <CopyToClipboard elementToBeCopy={`<div>
    Fe-pilot library offers component like scanner,
    search, autofill otp, phonebook, share and many more
    for a small/medium/large size web based applications<div>
`} />

  // Used as a Service
  copyToClipboard({  elementToBeCopy={`
    Fe-pilot library offers component like scanner,
    voice search, autofill otp, phonebook, share and many more
    for a small/medium/large size web based applications`}
  });
  ```

  Here's an example of a advance usage:

  ```javascript
  import { CopyToClipboard } from 'fe-pilot/CopyToClipboard';

  const successCb = (response) => {
    console.log("success response:", response);
  }

  const failureCb = (response) => {
    console.log("failure response:", response);
  }

  return (
    <CopyToClipboard
      successCb={successCb}
      failureCb={failureCb}
      elementToBeCopy={`Fe-pilot library offers component like
        scanner, voice search, autofill otp, phonebook, share
        and many more for a small/medium/large size web based applications`
      }
    >
      Pass clickable element (button, anchor etc)  here to bind onClick event
    </CopyToClipboard>
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
      <td>elementToBeCopy</td>
      <td>Element</td>
      <td>Pass the text/element/number to be copy</td>
     <td> <pre>---</pre> </td>
    </tr>
    elementToBeCopy
  </table>

