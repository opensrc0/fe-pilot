# View360

A View360 Component will be used to rotate the image 360 Degree. We have to pass multiple image from different angle to support 360 view of image.


## Demo

A minimal [Demo Link](https://6jpxdq.csb.app/?component=View360)


## Usage/Examples

| Value |  Used as a  | Description|
|--------- | -------- |-----------------|
| <b>View360</b> | :white_check_mark: Component | Can be used as Component |
| <b>view360<b> | :x: Service | Can be used as Service |

##### 1. Here's an example of basic usage with Multiple Import: with Default Import:
```javascript
// Default import will return View360 Component
import View360 from 'fe-pilot/View360';


<View360
  height="600px"
  width="100%"
  imageList={[
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

##### 2. Here's an example of basic usage with Multiple Import: with Multiple Import:
```javascript
import { View360 } from 'fe-pilot/View360';

<View360
  height="600px"
  width="100%"
  imageList={[
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
      Default Value
    </th>
  </tr>
  <tr>
    <td>
      height
    </td>
    <td>String</td>
    <td>Height of the Image</td>
    <td>
      Default value is <b>300px</b>
    </td>
  </tr>
  <tr>
    <td>
        width
    </td>
    <td>String</td>
    <td>
      Width of the Image
    </td>
    <td>
      Default value is <b>100%</b>
    </td>
  </tr>
  <tr>
    <td>
        imageList
    </td>
    <td>Array</td>
    <td>
      Provide the images from different angle to rotate
    </td>
    <td>
      Default value is <b>[]</b>
    </td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

