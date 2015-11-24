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

let DefaultProp = React.createClass({

  getDefaultProps() {
    return {
      test2: 'abc'
    };
  },

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

test('test a basic react component with default props', function(t) {
  t.plan(1);

  let defaultPropOutput = jsxToString(<DefaultProp test="abc" />);

  t.equal(defaultPropOutput, '<DefaultProp test="abc" />');
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
      keyValueOverride: {
        test1: '_testCallBack1',
        test2: '_testCallBack2'
      }
    }
  );

  t.equal(funcOutput, '<Basic test1={_testCallBack1} test2={_testCallBack2} />');
});

test('test a react component with react children', function(t) {
  t.plan(1);

  let funcOutput = jsxToString(
    <Basic>
      <BasicChild />
    </Basic>
  );

  t.equal(funcOutput, '<Basic>\n  <BasicChild />\n</Basic>');
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
      <BasicChild>
        <BasicChild>
          <BasicChild>
            Title
          </BasicChild>
        </BasicChild>
      </BasicChild>
    </Basic>
  );

  t.equal(funcOutput, '<Basic>\n  <BasicChild>\n    <BasicChild>\n      <BasicChild>\n        Title\n      </BasicChild>\n    </BasicChild>\n  </BasicChild>\n</Basic>');
});
