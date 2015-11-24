# jsx-to-string

Parse your React JSX components to string

[![Build Status](https://api.travis-ci.org/alansouzati/jsx-to-string.svg)](https://travis-ci.org/alansouzati/jsx-to-string)

### Install

```sh
npm install jsx-to-string
```

### Usage

```js
import React from 'react';
import jsxToString from 'jsx-to-string';
// or var jsxToString = require('jsx-to-string').default;

let Basic = React.createClass({
  render() {
    return (
      <div />
    );
  }
}); //this is your react component

console.log(jsxToString(<Basic test1="test" />)); //outputs: <Basic test1="test" />
```

### Defaults

  1. The default value for function is `...`. Use `keyValueOverride` for custom key values.

### Options

  1. keyValueOverride

    This key allows you to replace the current key value, for example:

```js
import React from 'react';
import jsxToString from 'jsx-to-string';
//or var jsxToString = require('jsx-to-string').default;

let Basic = React.createClass({
  render() {
    return (
      <div />
    );
  }
}); //this is your react component

let _onClickHandler = function () {
  //no-op
}
console.log(jsxToString(<Basic onClick={_onClickHandler} />, {
  keyValueOverride: {
    onClick: '_onClickHandler'
  }
})); //outputs: <Basic onClick={_onClickHandler} />
```

### License

[MIT](https://github.com/alansouzati/jsx-to-string/blob/master/LICENSE)
