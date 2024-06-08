# Setup
Clone the repository and run the following commands from the root directory of fe-pilot

## Local setup

#### 1. Go to the fe-pilot repo location in your terminal and do
```
npm install
npm start
```

#### 2. Open terminal and Go to any ```working react application``` in your system, where you want to ```implement FE-Pilot```

```js
npm link {PATH}/fe-pilot/
```
&nbsp;&nbsp;**Note:** PATH is the location of cloned fe-pilot folder


#### 3. Import the component and use it
```js
import PhoneBook from 'fe-pilot/PhoneBook';
import Share from 'fe-pilot/Share';
import { TextToSpeech, TextToSpeechStart, TextToSpeechStop } from 'fe-pilot/TextToSpeech';

<PhoneBook />
<Share />
 <TextToSpeech text="Password field is not contained in a form: (More info: ">
  <TextToSpeechStart>Start Icon</TextToSpeechStart>
  <TextToSpeechStop>Stop Icon</TextToSpeechStop>
</TextToSpeech>
```

#### 4. Are you getting Error ? continue to step 4. If no error found go to step 5.

**bug:** ```TypeError: Cannot read properties of null (reading 'useState')```<br/>
**solution**  Go to fe-pilot in terminal and run below command

```js
npm link {PATH}/{Your Repo}
```

&nbsp;&nbsp;**Note:** PATH is the location of ```your repo``` folder. ```Your Repo``` is the name of the repo.

#### 5. Hurrah...! Now fe-pilot repo is available inside the node_modules of your project, and waching change in fe-pilot.


## Folder Structure
```
fe-pilot
  └── __app
    └── component
      ├──TextToSpeech                (component name)
      |   ├──index.js                (top level exports/re-exports)
      |   ├──TextToSpeech.js         (parent component)
      |   ├──TextToSpeechStart.js    (child component)
      |   └──TextToSpeechStop.js     (child component)
```

```mermaid
graph TD;
    fe-pilot-->__app;
    __app-->component;
    component-->AutoFillOtp;
    component-->CopyToClipboard;
    component-->LiveLocation;
    component-->LocateMe;
    component-->PhoneBook;
    component-->Scanner;
    component-->Share;
    component-->TextToSpeech;
    component-->VoiceRecognition;
```
> [!IMPORTANT]
> App Structure from root to component

<br /><br /><br />

```mermaid
graph TD;
    Scanner--->ScannerCamera;
    Scanner--->ScannerClose;
    Scanner--->ScannerFacing;
    Scanner--->ScannerFlash;
    Scanner--->ScannerGallery;
    Scanner--->ScannerScanBox;
    Scanner--->ScannerClick;
```
> [!IMPORTANT]
> Camera component Structure

<br /><br /><br />

```mermaid
graph TD;
    TextToSpeech--->TextToSpeechStart;
    TextToSpeech--->TextToSpeechStop;
```
> [!IMPORTANT]
> TextToSpeech component Structure

<br /><br /><br />

```mermaid
graph TD;
    VoiceRecognition--->VoiceRecognitionIcon;
    VoiceRecognition--->VoiceRecognitionModal;
```
> [!IMPORTANT]
> VoiceRecognition component Structure
