import React from 'react';
import jsxToString from '../src/index';
import sinon from 'sinon';
import test from 'tape';

let Basic = React.createClass({
  render() {
    return (
      <div />
    );
  }
});

let BasicChild = React.createClass({
  render() {
    return (
      <div />
    );
  }
});

test('test a basic react component', function(t) {
  t.plan(1);

  let basicOutput = jsxToString(<Basic />);

  t.equal(basicOutput, '<Basic />');
});

test('test a react component with basic props', function(t) {
  t.plan(1);

  let propsOutput = jsxToString(
    <Basic test="abc" test2={4} test4={true}
      test5={{abc: "abc"}} test6="" />
  );

  t.equal(propsOutput, '<Basic test="abc" test2={4} test4={true} test5={{\n  "abc": "abc"\n}} test6="" />');
});

test('test a react component with function props', function(t) {
  t.plan(1);

  let _testCallBack = function () {
    //no-op
  };
  let funcOutput = jsxToString(<Basic test1={_testCallBack} />);

  t.equal(funcOutput, '<Basic test1={...} />');
});

test('test a react component with custom name function', function(t) {
  t.plan(1);

  let _testCallBack1 = function () {
    //no-op
  };

  let _testCallBack2 = function () {
    //no-op
  };

  let funcOutput = jsxToString(
    <Basic test1={_testCallBack1} test2={_testCallBack2} />, {
      functionValue: {
        test1: '_testCallBack1',
        test2: '_testCallBack2'
      }
    }
  );

  t.equal(funcOutput, '<Basic test1={_testCallBack1} test2={_testCallBack2} />');
});

test('test a react component with text children', function(t) {
  t.plan(1);

  let funcOutput = jsxToString(
    <Basic>Test</Basic>
  );

  t.equal(funcOutput, '<Basic>\n  Test\n</Basic>');
});

test('test a react component with multiple children', function(t) {
  t.plan(1);

  let funcOutput = jsxToString(
    <Basic>
      Test
      <h1>Abc</h1>
      <BasicChild test1="abc">
        <Basic test2="www" />
      </BasicChild>
    </Basic>
  );

  t.equal(funcOutput, '<Basic>\n  Test\n  <h1>\n    Abc\n  </h1>\n  <BasicChild test1="abc">\n    <Basic test2="www" />\n  </BasicChild>\n</Basic>');
});
