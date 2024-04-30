
# Network Connection

A Network Connection Component returns online status and also information about the system's connection in terms of general connection type (e.g., 'Wi-Fi, 'cellular', etc.). Which can be used to select high-definition content or low-definition content based on the user's connection.


## Usage/Examples

```javascript
import { NetworkConnection, Online, Offline} from 'fe-pilot/NetworkConnection';

  const success = (response) => {
    console.log(response, " success response")
  }

  const failure = (response) => {
    console.log(response, " failure response")
  }

  return (
    <NetworkConnection successCb={success} failureCb={failure}>
        <Online>Online</Online>
        <Offline>
            <div>Pass custom Html to be displayed when appeared offline</div>
        </Offline>
    </NetworkConnection>
  );
}
```

