<img src="https://github.com/opensrc0/fe-theme/blob/develop/logo.svg" alt="FE-Theme Logo" width="100%" style="width: 100%;">
<h2 align="center">A React UI library using styled-component to build consistent, responsive, theme able UI 💪 </h2>
<br />
<p align="center">
  <a href="https://www.npmjs.com/package/fe-theme">
   <img alt="Minified Size" src="https://badgen.net/bundlephobia/minzip/fe-theme?color=cyan"/>
  </a>
  <a href="https://styled-components.com/releases#v6.1.1">
  <img alt="Styled Component Version" src="https://img.shields.io/badge/styled_component-6.1.1-%2350c62a?logo=styled-components&logoColor=50c62a"/>
  </a>
  <a href="https://react.dev/reference/react">
  <img alt="React Version" src="https://img.shields.io/badge/react-18.2.0-%23f1e05a?logo=React"/>
  </a>
  <a href="https://www.npmjs.com/package/fe-theme">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/fe-theme?label=Downloads&logo=npm"/>
  </a>
  <a href="https://www.npmjs.com/package/fe-theme/v/latest">
    <img alt="Latest Release" src="https://badgen.net/github/release/opensrc0/fe-theme?icon=github&color=pink"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/opensrc0/fe-theme/stargazers">
    <img alt="Github Stars" src="https://badgen.net/github/stars/opensrc0/fe-theme?icon=github&color=purple"/>
  </a>
  <a href="https://github.com/opensrc0/fe-theme/blob/master/LICENSE.md">
    <img alt="MIT License" src="https://badgen.net/static/license/MIT/orange"/>
  </a>
</p>
<br />

FE-Theme is a styled-component based comprehensive library of accessible, reusable, and composable React components that streamlines the development of modern web applications and websites. The library offers a theme based UI to quickly start a new small/medium/large size web based applications.

## Table of contents
1. 🚀 [Features](#features)
2. 📦 [Installation](#installation)
3. 💻 [Usage](#usage)
4. ⚙️  [Customization](#customization)
4. 📚 [Online Editor Templates](#online-editor-templates)
5. 📝 [Contributing](#contributing)
6. ✨ [Contributors](#contributors)
7. ⚖️  [License](#license)
  
## Features

- **Theme:** FE-Theme provides themeable based UI component, and are easy to configure.
- **Web/Mobile Support:** FE-theme will be helpfull in Large/Mid/Small size of web based applications.
- **Ease of Styling:** FE-Theme contains a set of layout components like `Button` and `Input` that make it easy to style your components by passing props.
- **Advancement:** FE-Theme provide a variety of advance plug and play component like `Voice Search`, `Share`, `Contact List`, `Live Location Tracking`, `Current Location` etc.
- **Scalable & Maintainable:** FE-Theme components are built on top of a React UI and Styled-Component for better scalable, maintainable component.
- **Accessiblity Support:** FE-Theme components follow the accessiblity guidelines specifications and have the right `aria-*` attributes.
- **Dark Mode UI:** FE-Theme support dark mode compatibility.
  
## Installation
Install `fe-theme` package using any package manager
  
```sh
# with Yarn
$ yarn add fe-theme
    
# with npm
$ npm i fe-theme --save

# with pnpm
$ pnpm add fe-theme

# with Bun
$ bun add fe-theme
```

## Usage

#### 1. Use fe-theme in your application using themeProvider

```js
import { ThemeProvider } from 'styled-components'; // import ThemeProvider component
import init from 'fe-theme/init'; // import Init function 
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap your application with ThemeProvider
  <ThemeProvider theme={init()}>
    <App />
  </ThemeProvider>
);
```

#### 2. You are good to go and import fe-theme component in your application
```js
import Button from 'fe-theme/Button';

<Button />
```

&nbsp;&nbsp;Wow, the configuration is quite simple, but wait... button design is different in your application. 
&nbsp;&nbsp;No worry, Checkout Customization.


## Customization

#### 1. Create your own theme

==> To Generate config files for components **Automatically** using command line [Check Commands](./.github/COMMAND.md).

==> To create config files for components **Manually**, follow steps given below.

&nbsp;&nbsp; **a)** Create an empty folder called ```fe-theme-config``` in your application at any location.

&nbsp;&nbsp; **c)** Create ```configButton.js``` file inside ```fe-theme-config folder``` (To configure Button Component)

```js
const Button = {
  primary: {
    color: configColor.white,
    background: configColor.themeColor,
    borderColor: configColor.themeColor,
    borderRadius: '4px',
  },
  outlined: {
    color: configColor.themeColor,
    bgColor: configColor.white,
    borderColor: configColor.themeColor,
    borderRadius: '14px',
  },
  size: {
    s: { fontSize: 'xs', padding: [1, 2] },
    m: { fontSize: 's', padding: [1.5, 2] },
    l: {  fontSize: 's',  padding: [2, 2.5] },
  },
  extraProps: {},
};

export default Button;
```
&nbsp;&nbsp; **Note** Config file name start with ```config``` keyword along with ```component Name``` like ```configButton.js``` or ```configInput.js```

&nbsp;&nbsp; **c)** Create theme.js file and include configButton.js 
```js
import Button from '../configButton';

export default {
  Button,
};

```

#### 2. Pass the newly created theme file in init function

```js
import { ThemeProvider } from 'styled-components';
import init from 'fe-theme/init';
import theme from '{PATH}/fe-theme-config/theme';  // Include your theme to fe-theme
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Inside the Init function pass theme
  <ThemeProvider theme={init(theme)}>
    <App />
  </ThemeProvider>
);
```

**Note:** ```PATH``` is a variable i.e. location of config files in your application

**Hurrah...!!!** Now you can change button(any compponent) property according to your application

```
Your Application Folder(Root Directory)
  └──fe-theme-config                       
    ├──configButton           
    ├──configInput          
    └──configChip
```
Play around the property of component according to your project.

## Online Editor Templates
#### 1. CodeSandbox
- JavaScript Starter: https://codesandbox.io/p/devbox/fe-theme-js-6q2vcg
<!-- - TypeScript Starter: WIP -->
<!-- - NextJS TypeScript Starter: WIP -->

#### 2. Stackblitz
- JavaScript Starter: https://stackblitz.com/edit/fe-theme-js-b6mri2
<!-- - TypeScript Starter: WIP -->
<!-- - NextJS TypeScript Starter: WIP -->


## Contributing

Feel like contributing? Most welcome! 
[Setup locally](./.github/SETUP.md) to get fe-theme working on your local machine and [guide lines](./.github/CONTRIBUTING.md) to contribute in fe-theme.

## Contributors

Thanks goes to these wonderful people

<table>
    <tbody>
      <tr>
        <td align="center" valign="top" width="14.28%">
          <a href="https://github.com/opensrc0">
            <img src="https://avatars.githubusercontent.com/u/6891544?s=400&v=4" width="64px;" alt="Himanshu Gupta" />
            <br />
            <sub><b>Himanshu Gupta</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a href="https://github.com/ashwinihegde123">
            <img src="https://avatars.githubusercontent.com/u/40521396?v=4" width="64px;" alt="Ashwini Hegde" />
            <br />
            <sub><b>Ashwini Hegde</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a href="https://github.com/vineet091">
            <img src="https://avatars.githubusercontent.com/u/5345138?v=4" width="64px;" alt="Vineet Gupta" />
            <br />
            <sub><b>Vineet Gupta</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a href="https://github.com/Alok30">
            <img src="https://avatars.githubusercontent.com/u/36290248?s=64&v=4" width="64px;" alt="Alok Dubey" />
            <br />
            <sub><b>Alok Dubey</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a href="https://github.com/Ravi-Chef">
            <img src="https://avatars.githubusercontent.com/u/31059087?v=4" width="64px;" alt="Ravi Verma" />
            <br />
            <sub><b>Ravi Verma</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a target="_blank" href="https://github.com/semantic-release-bot">
            <img src="https://avatars.githubusercontent.com/u/32174276?v=4" width="64px;" alt="Semantic Release Bot" />
            <br />
            <sub><b>Semantic Release Bot</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a target="_blank" href="https://github.com/Ghanshyam-K-Dobariya">
            <img src="https://avatars.githubusercontent.com/u/5426993?s=400" width="64px;" alt="Ghanshyam KD" />
            <br />
            <sub><b>Ghanshyam KD</b></sub>
          </a>
          <br />
        </td>
      </tr>
      <tr>
        <td align="center" valign="top" width="14.28%">
          <a target="_blank" href="https://github.com/fossabot">
            <img src="https://avatars.githubusercontent.com/u/29791463?v=4" width="64px;" alt="Fossa Bot" />
            <br />
            <sub><b>Fossa Bot</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a target="_blank" href="https://github.com/swarajgolu">
            <img src="https://avatars.githubusercontent.com/u/31703347?v=4" width="64px;" alt="Swaraj Singh" />
            <br />
            <sub><b>Swaraj Singh</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a target="_blank" href="https://github.com/abhinavGupta786">
            <img src="https://avatars.githubusercontent.com/u/69836367?v=4" width="64px;" alt="Abhinav Gupta" />
            <br />
            <sub><b>Abhinav Gupta</b></sub>
          </a>
          <br />
        </td>
        <td align="center" valign="top" width="14.28%">
          <a target="_blank" href="https://github.com/hardikjain29">
            <img src="https://avatars.githubusercontent.com/u/13768932?v=4" width="64px;" alt="Hardik Jain" />
            <br />
            <sub><b>Hardik Jain</b></sub>
          </a>
          <br />
        </td>
      </tr>
    </tbody>
</table>



## License

MIT © [Himanshu Gupta](https://github.com/opensrc0)
