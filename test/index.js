import React from 'react';
import jsxToString from '../src/index';
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

  let output = jsxToString(<Basic />);

  t.equal(output, '<Basic />');
});

test('test a basic react component with default props', function(t) {
  t.plan(1);

  let output = jsxToString(<DefaultProp test="abc" />);

  t.equal(output, '<DefaultProp test="abc" />');
});

test('test a react component with basic props', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic test="abc" test2={4} test4={true}
      test5={{abc: "abc"}} test6="" />
  );

  t.equal(output, '<Basic test="abc" test2={4} test4={true} test5={{"abc": "abc"}} test6="" />');
});

test('test a react component with function props', function(t) {
  t.plan(1);

  let _testCallBack = function () {
    //no-op
  };
  let output = jsxToString(<Basic test1={_testCallBack} />);

  t.equal(output, '<Basic test1={...} />');
});

test('test a react component with react props', function(t) {
  t.plan(1);

  let _testCallBack = function () {
    //no-op
  };
  let output = jsxToString(<Basic test1={<Basic />} />);

  t.equal(output, '<Basic test1={<Basic />} />');
});

test('test a react component with custom name function', function(t) {
  t.plan(1);

  let _testCallBack1 = function () {
    //no-op
  };

  let _testCallBack2 = function () {
    //no-op
  };

  let output = jsxToString(
    <Basic test1={_testCallBack1} test2={_testCallBack2} />, {
      keyValueOverride: {
        test1: '_testCallBack1',
        test2: '_testCallBack2'
      }
    }
  );

  t.equal(output, '<Basic test1={_testCallBack1} test2={_testCallBack2} />');
});

test('test a react component with react children', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic>
      <BasicChild />
    </Basic>
  );

  t.equal(output, '<Basic>\n  <BasicChild />\n</Basic>');
});

test('test a react component with text children', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic>Test</Basic>
  );

  t.equal(output, '<Basic>\n  Test\n</Basic>');
});

test('test a react component with ignore props', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic test1="ignore">Test</Basic>,
    {
      ignoreProps: ['test1']
    }
  );

  t.equal(output, '<Basic>\n  Test\n</Basic>');
});


test('test a react component with multiple children', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic>
      <BasicChild>
        <BasicChild>
          <BasicChild>
            Title
          </BasicChild>
          <BasicChild>
            Title 2
          </BasicChild>
        </BasicChild>
      </BasicChild>
    </Basic>
  );

  t.equal(output, '<Basic>\n  <BasicChild>\n    <BasicChild>\n      <BasicChild>\n        Title\n      </BasicChild>\n      <BasicChild>\n        Title 2\n      </BasicChild>\n    </BasicChild>\n  </BasicChild>\n</Basic>');
});

test('test a react component with a null children', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic>
      <BasicChild>
        <BasicChild>
          {null}
          <BasicChild>
            Title 2
          </BasicChild>
        </BasicChild>
      </BasicChild>
    </Basic>
  );

  t.equal(output, '<Basic>\n  <BasicChild>\n    <BasicChild>\n      <BasicChild>\n        Title 2\n      </BasicChild>\n    </BasicChild>\n  </BasicChild>\n</Basic>');
});

test('test a react component with spread operator', function(t) {
  t.plan(1);

  let someProps = {
    prop1: true,
    prop2: "active"
  };

  let output = jsxToString(
    <Basic {...someProps}/>
  );

  t.equal(output, '<Basic prop1={true} prop2="active" />');
});

test('test a react component with custom displayName', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic />,
    {
      displayName: 'CustomDisplayName'
    }
  );

  t.equal(output, '<CustomDisplayName />');
});
