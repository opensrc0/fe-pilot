# TextToSpeech

A ```TextToSpeech``` component will help to ```convert``` the ```text``` value in the ```voice```. You will pass the text and your application will convert it in the sound.


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=TextToSpeech)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>TextToSpeech</b> | :white_check_mark: Component | Can be used as Component |
| <b>textToSpeech<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return TextToSpeech Component
import TextToSpeech from 'fe-pilot/TextToSpeech';

<TextToSpeech /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { TextToSpeech, textToSpeech } from 'fe-pilot/TextToSpeech';

// Used as a Component
<TextToSpeech
  text={`Fe-pilot library offers component like
    scanner, voice search, autofill otp, phonebook,
    share and many more for a small/medium/large
    size web based applications`
  }
/>

// Used as a Service
textToSpeech({
  text={`Fe-pilot library offers component like
    scanner, voice search, autofill otp, phonebook,
    share and many more for a small/medium/large
    size web based applications`
  }
});
```

##### 3. Here's an example of a advanced usage:

```javascript
import { TextToSpeech, TextToSpeechStart, TextToSpeechStop } from 'fe-pilot/TextToSpeech';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <TextToSpeech
    text={`Fe-pilot library offers component like
      scanner, voice search, autofill otp, phonebook,
      share and many more for a small/medium/large
      size web based applications`
    }
    successCb={successCb}
    failureCb={failureCb}
  >
    <TextToSpeechStart>
      Start Icon/Text/Element
    </TextToSpeechStart>
    <TextToSpeechStop>
      Stop Icon/Text/Element
    </TextToSpeechStop>
  </TextToSpeech>
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
    <td>text</td>
    <td>String</td>
    <td>Text that need to be convert in voice</td>
    <td> <pre>---</pre> </td>
  </tr>
</table>

### Child Component
<table>
  <th>
    Child
  </th>
  <th>
    Type
  </th>
  <th>
    Description
  </th>
  <tr>
    <td>TextToSpeechStart</td>
    <td>Element</td>
    <td><b>Speech</b> will <b>start</b> onClick on <b>start</b> Icon/Text</td>
  </tr>
  <tr>
    <td>TextToSpeechStop</td>
    <td>Element</td>
    <td><b>Speech</b> will <b>stop</b> onClick on <b>stop</b> Icon/Text</td>
  </tr>
</table>
