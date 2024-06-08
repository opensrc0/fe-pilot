# View360

A short description about the component


## Demo

A minimal [Online demo](link of codesandbox).


## Usage/Examples

Here's an example of basic usage:
```javascript
import { View360 } from 'fe-pilot/View360';

<View360 height="600px" width="100%" imageList={[
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(1).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(2).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(3).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(4).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(5).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(6).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(7).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(8).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(9).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(10).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(11).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(12).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(13).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(14).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(15).jpg",
          "http://woosterwebdesign.com/experiments/images/car_slides/car_(16).jpg",
        ]}
        /> // Used as a Component

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

