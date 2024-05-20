
# Network Monitor

A Network Monitor Component returns online status and also information about the system's connection in terms of general connection type (e.g., 'Wi-Fi, 'cellular', etc.). Which can be used to select high-definition content or low-definition content based on the user's connection.


## Usage/Examples

```javascript
import { NetworkMonitor, OnlineToast, OfflineToast } from 'fe-pilot/NetworkMonitor';

  const success = (response) => {
    console.log("success response:", response);
  }

  const failure = (response) => {
    console.log("failure response:", response);
  }

  return (
    <NetworkMonitor successCb={success} failureCb={failure}>
        <OnlineToast>Online</OnlineToast>
        <OfflineToast>
            <div>Pass custom Html to be displayed when appeared offline</div>
        </OfflineToast>
    </NetworkMonitor>
  );
}
```

### Universal Props Table
| Props      | Type               | Universal        | Description|
| -------    | ------------------ | ---------------- | ---------- |
| showForever| Boolean            |:white_check_mark:|
| loadingCb  | function           |:white_check_mark:|
| successCb  | function           |:white_check_mark:|
| failureCb  | function           |:white_check_mark:|
| successMsg | String             |:white_check_mark:|
| failureMsg | Object             |:white_check_mark:|

### Component Specific Props Table
| Props      | Type               | Specific         | Description|
| -------    | ------------------ | ---------------- | ---------- |
| No Props Specific to Component| ---- | ---- | ----- |

