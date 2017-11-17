import React from 'react';
import jsxToString from '../src/index';
import test from 'tape';
import { fromJS } from 'immutable';

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

  t.equal(output, '<DefaultProp test=\'abc\' />');
});

test('test a basic react component with key props', function(t) {
  t.plan(1);

  let output = jsxToString(<DefaultProp key="abc" />);

  t.equal(output, '<DefaultProp key=\'abc\' />');
});

test('test a react component with basic props', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic test="abc" test2={4} test4={true}
      test5={{abc: "abc"}} test6="" />
  );

  t.equal(output, '<Basic test=\'abc\'\n  test2={4}\n  test4={true}\n  test5={{"abc": "abc"}}\n  test6=\'\' />');
});

test('test a react component with function props', function(t) {
  t.plan(1);

  let _testCallBack = function () {
    //no-op
  };

  let output = jsxToString(<Basic test1={_testCallBack} />);

  t.equal(
    output, '<Basic test1={...} />'
  );
});

test('test a react component with annonymous function', function(t) {
  t.plan(1);

  let output = jsxToString(<Basic test1={function() {}} />);

  t.equal(
    output, '<Basic test1={...} />'
  );
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

  t.equal(output, '<Basic test1={_testCallBack1}\n  test2={_testCallBack2} />');
});

test('test a react component with dynamic keyValueOverride', function(t) {
  t.plan(2);

  const keyValueOverride = {
    test1: function (propValue) {
      if (typeof propValue === 'function') {
        return propValue.name
      } else {
        return '_thisIsNotAFunction';
      }
    }
  };

  function testCallback() {
    //no-op
  };

  let output1 = jsxToString(
    <Basic test1={testCallback} />, { keyValueOverride }
  );

  let output2 = jsxToString(
    <Basic test1={'Not a function'} />, { keyValueOverride }
  );

  t.equal(output1, '<Basic test1={testCallback} />');
  t.equal(output2, '<Basic test1={_thisIsNotAFunction} />');
});

test('test a react component with function code enabled', function(t) {
  t.plan(1);

  let _testCallBack1 = function () {
    //no-op
  };

  let output = jsxToString(
    <Basic test1={_testCallBack1} />, {
      useFunctionCode: true
    }
  );

  t.equal(
    output, '<Basic test1={function _testCallBack1() {\n    //no-op\n  }} />'
  );
});

test('test a react component with function name enabled', function(t) {
  t.plan(1);

  let _testCallBack1 = function () {
    //no-op
  };

  let output = jsxToString(
    <Basic test1={_testCallBack1} />, {
      useFunctionCode: true,
      functionNameOnly: true
    }
  );

  t.equal(output, '<Basic test1={_testCallBack1} />');
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

  t.equal(output, '<Basic prop1={true}\n  prop2=\'active\' />');
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

test('test a react component with react prop', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic prop={<Basic />} />
  );

  t.equal(output, '<Basic prop={<Basic />} />');
});

test('test a react component with null prop', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic prop={null} />
  );

  t.equal(output, '<Basic prop={null} />');
});

test('test a react component with undefined prop', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic prop={undefined} />
  );

  t.equal(output, '<Basic prop={undefined} />');
});

test('test a react component with immutable prop', function(t) {
  t.plan(1);

  const imm = fromJS({test: 'abc'});
  let output = jsxToString(
    <Basic prop={imm} />
  );

  t.equal(output, '<Basic prop={{"test": "abc"}} />');
});

test('test a react component with multiple children and immutable props', function(t) {
  t.plan(1);

  const imm = fromJS({test: 'abc'});
  let output = jsxToString(
    <Basic>
      <BasicChild>
        <BasicChild props={imm}>
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

  t.equal(output, '<Basic>\n  <BasicChild>\n    <BasicChild props={{"test": "abc"}}>\n      <BasicChild>\n        Title\n      </BasicChild>\n      <BasicChild>\n        Title 2\n      </BasicChild>\n    </BasicChild>\n  </BasicChild>\n</Basic>');
});

test('test a react single component with ignore tags', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic>
      <p>Test</p>
    </Basic>,
    {
      ignoreTags: ['Basic']
    }
  );

  t.equal(output, '');
});

test('test a react component with multiple ignore tags', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic>
      <svg />
      <p>Test</p>
      <img />
      <BasicChild />
    </Basic>,
    {
      ignoreTags: ['svg', 'img', 'BasicChild']
    }
  );

  t.equal(output, '<Basic>\n  <p>\n    Test\n  </p>\n</Basic>');
});

test('test a deep react component with multiple ignore tags', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic>
      <svg />
      <p>
        Title 1
        <svg />
        <div>
          <p>Title 2</p>
          <img />
        </div>
        <BasicChild>
          Title 3
        </BasicChild>
      </p>
      <img />
    </Basic>,
    {
      ignoreTags: ['svg', 'img']
    }
  );

  t.equal(output, '<Basic>\n  <p>\n    <div>\n      <p>\n        Title 2\n      </p>\n    </div>\n    <BasicChild>\n      Title 3\n    </BasicChild>\n  </p>\n</Basic>');
});

test('test a simple react component with boolean props and shortBooleanSyntax on', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic test test2={false} test3={true}/>,
    {
      shortBooleanSyntax: true,
    }
  );

  t.equal(output, '<Basic test\n  test2={false}\n  test3 />');
});

test('test a complex react component with boolean props and shortBooleanSyntax on', function(t) {
  t.plan(1);

  let output = jsxToString(
    <Basic test="abc" test2={4} test4={true}
      test5={{abc: "abc"}} test6="" test7={false} test8>
      <BasicChild test1 test2={false} test3={5} test4={6}>
        Title 1
      </BasicChild>
    </Basic>,
    {
      shortBooleanSyntax: true,
    }
  );

  t.equal(output, '<Basic test=\'abc\'\n  test2={4}\n  test4\n  test5={{"abc": "abc"}}\n  test6=\'\'\n  test7={false}\n  test8>\n  <BasicChild test1\n    test2={false}\n    test3={5}\n    test4={6}>\n    Title 1\n  </BasicChild>\n</Basic>');
});