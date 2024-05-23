# NetworkMonitor

A Network Monitor Component returns online status and also information about the system's connection in terms of general connection type (e.g., 'Wi-Fi, 'cellular', etc.). Which can be used to select high-definition content or low-definition content based on the user's connection.

  ## Demo

  A minimal [Online demo](link of codesandbox).


  ## Usage/Examples

  Here's an example of basic usage:
  ```javascript
  import { NetworkMonitor, networkMonitor } from 'fe-pilot/NetworkMonitor';

  <NetworkMonitor /> // Used as a Component

  networkMonitor(); // Used as a Service
  ```

  Here's an example of a advance usage:

  ```javascript
  import { NetworkMonitor, OnlineToast, OfflineToast  } from 'fe-pilot/NetworkMonitor';

  const successCb = (response) => {
    console.log("success response:", response);
  }

  const failureCb = (response) => {
    console.log("failure response:", response);
  }

  return (
    <NetworkMonitor successCb={successCb} failureCb={failureCb}>
        <OnlineToast>Online</OnlineToast>
        <OfflineToast>
            <div>Pass custom Html to be displayed when appeared offline</div>
        </OfflineToast>
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
      <td>To hide unsupported feature from browser, make it <b>false</b>. Default value is <b>true</b></td>
      <td> <pre>---</pre> </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>

