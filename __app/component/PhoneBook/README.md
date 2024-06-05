# PhoneBook

The PhoneBook component will help you to ```open phonebook directory``` from ```your phone```. User can choose any contact from the phone book ```directory``` and get the contact details like ```name```, ```email```, ```tel```, ```address```, ```icon```


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=PhoneBook)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>PhoneBook</b> | :white_check_mark: Component | Can be used as Component |
| <b>phoneBook<b> | :white_check_mark: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Default Import:
```javascript
// Default import will return PhoneBook Component
import PhoneBook from 'fe-pilot/PhoneBook';

<PhoneBook /> // Used as a Component

```

##### 2. Here's an example of basic usage with Multiple Import:
```javascript
import { PhoneBook, phoneBook } from 'fe-pilot/PhoneBook';

<PhoneBook /> // Used as a Component

phoneBook(); // Used as a Service
```

##### 3. Here's an example of a advanced usage:

```javascript
import { PhoneBook } from 'fe-pilot/PhoneBook';

const successCb = (response) => {
  console.log("success response:", response);
}

const failureCb = (response) => {
  console.log("failure response:", response);
}

return (
  <PhoneBook
    successCb={successCb}
    failureCb={failureCb}
    showForever={false}
    contactProperty={['name', 'email', 'tel', 'address', 'icon']}
    isSelectMultiple={true}
  >
    Pass clickable element (button, anchor etc)  here to bind onClick event
  </PhoneBook>
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
    <td>contactProperty</td>
    <td>Array</td>
    <td></td>
    <td>['name', 'email', 'tel', 'address', 'icon']</td>
  </tr>
  <tr>
    <td>isSelectMultiple</td>
    <td>Boolean</td>
    <td></td>
    <td></td>
  </tr>
</table>

