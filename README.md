# fullscreen-react

[![npm (scoped)](https://img.shields.io/npm/v/@chiragrupani/fullscreen-react.svg?style=flat-square)](https://www.npmjs.com/package/@chiragrupani/fullscreen-react) [![npm](https://img.shields.io/npm/dt/@chiragrupani/fullscreen-react.svg?style=flat-square)](https://www.npmjs.com/package/@chiragrupani/fullscreen-react)

[![Build Status](https://dev.azure.com/chiragrupani/fullscreen-react/_apis/build/status/ChiragRupani.fullscreen-react?branchName=main)](https://github.com/ChiragRupani/fullscreen-react)

> Allows any html element to enter full screen using Browser API.

## Installation

Install the package

```bash
npm i @chiragrupani/fullscreen-react
```

## Usage

Use with class component or function component like below:

> Class component example

```tsx
<button onClick={e => this.setState({isFullScreen: true})}>Go Fullscreen</button>

<FullScreen
    isFullScreen={this.state.isFullScreen}
    onChange={(isFullScreen) => {
        this.setState({ isFullScreen });
    }}
    >
    <div>Fullscreen</div>
</FullScreen>
```

> Function component example

```tsx
export default function FSExampleHook() {
  let [isFullScreen, setFullScreen] = React.useState(false);

  return (
    <>
      <button onClick={(e) => setFullScreen(true)}>Go Fullscreen</button>

      <FullScreen
        isFullScreen={isFullScreen}
        onChange={(isFull: boolean) => {
          setFullScreen(isFull);
        }}
      >
        <div>Fullscreen</div>
      </FullScreen>
    </>
  );
}
```

If you require entire body document in fullscreen instead of any specific element use `BodyFullScreen` instead of `FullScreen` like below. However, there can be atmost one BodyFullScreen:

```tsx
<BodyFullScreen
  isFullScreen={this.state.isFullScreen}
  onChange={(isFullScreen) => {
    this.setState({ isFullScreen });
  }}
>
  <div>Fullscreen</div>
</BodyFullScreen>
```
