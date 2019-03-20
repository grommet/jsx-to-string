import React from "react";
import jsxToString from "../src/index";
import { fromJS } from "immutable";

function Basic() {
  return <div />;
}

function DefaultProp(props) {
  return <div />;
}
DefaultProp.defaultProps = {
  test2: "abc"
};

function BasicChild() {
  return <div />;
}

test("test a basic react component", () =>
  expect(jsxToString(<Basic />)).toMatchSnapshot());

test("test a basic react component with default props", () =>
  expect(jsxToString(<DefaultProp test="abc" />)).toMatchSnapshot());

test("test a basic react component with key props", () =>
  expect(jsxToString(<DefaultProp key="abc" />)).toMatchSnapshot());

test("test a react component with basic props", () =>
  expect(
    jsxToString(
      <Basic
        test="abc"
        test2={4}
        test4={true}
        test5={{ abc: "abc" }}
        test6=""
      />
    )
  ).toMatchSnapshot());

test("test a react component with function props", () =>
  expect(jsxToString(<Basic test1={() => {}} />)).toMatchSnapshot());

test("test a react component with react props", () =>
  expect(jsxToString(<Basic test1={<Basic />} />)).toMatchSnapshot());

test("test a react component with custom name function", () => {
  const _testCallBack1 = function() {
    //no-op
  };

  const _testCallBack2 = function() {
    //no-op
  };

  const output = jsxToString(
    <Basic test1={_testCallBack1} test2={_testCallBack2} />,
    {
      keyValueOverride: {
        test1: "_testCallBack1",
        test2: "_testCallBack2"
      }
    }
  );

  expect(output).toMatchSnapshot();
});

test("test a react component with dynamic keyValueOverride", () => {
  const keyValueOverride = {
    test1: propValue =>
      typeof propValue === "function" ? propValue.name : "_thisIsNotAFunction"
  };

  function testCallback() {
    //no-op
  }

  const output1 = jsxToString(<Basic test1={testCallback} />, {
    keyValueOverride
  });

  const output2 = jsxToString(<Basic test1={"Not a function"} />, {
    keyValueOverride
  });

  expect(output1).toMatchSnapshot();
  expect(output2).toMatchSnapshot();
});

test("test a react component with function code enabled", () => {
  const _testCallBack1 = function() {
    //no-op
  };

  const output = jsxToString(<Basic test1={_testCallBack1} />, {
    useFunctionCode: true
  });

  expect(output).toMatchSnapshot();
});

test("test a react component with function name enabled", () => {
  const _testCallBack1 = function() {
    //no-op
  };

  let output = jsxToString(<Basic test1={_testCallBack1} />, {
    useFunctionCode: true,
    functionNameOnly: true
  });

  expect(output).toMatchSnapshot();
});

test("test a react component with react children", () =>
  expect(
    jsxToString(
      <Basic>
        <BasicChild />
      </Basic>
    )
  ).toMatchSnapshot());

test("test a react component with text children", () =>
  expect(jsxToString(<Basic>Test</Basic>)).toMatchSnapshot());

test("test a react component with ignore props", () =>
  expect(
    jsxToString(<Basic test1="ignore">Test</Basic>, {
      ignoreProps: ["test1"]
    })
  ).toMatchSnapshot());

test("test a react component with multiple children", () =>
  expect(
    jsxToString(
      <Basic>
        <BasicChild>
          <BasicChild>
            <BasicChild>Title</BasicChild>
            <BasicChild>Title 2</BasicChild>
          </BasicChild>
        </BasicChild>
      </Basic>
    )
  ).toMatchSnapshot());

test("test a react component with a null children", () =>
  expect(
    jsxToString(
      <Basic>
        <BasicChild>
          <BasicChild>
            {null}
            <BasicChild>Title 2</BasicChild>
          </BasicChild>
        </BasicChild>
      </Basic>
    )
  ).toMatchSnapshot());

test("test a react component with spread operator", () => {
  const someProps = {
    prop1: true,
    prop2: "active"
  };

  const output = jsxToString(<Basic {...someProps} />);

  expect(output).toMatchSnapshot();
});

test("test a react component with custom displayName", () =>
  expect(
    jsxToString(<Basic />, {
      displayName: "CustomDisplayName"
    })
  ).toMatchSnapshot());

test("test a react component with null prop", () =>
  expect(<Basic prop={null} />).toMatchSnapshot());

test("test a react component with undefined prop", () =>
  expect(<Basic prop={undefined} />).toMatchSnapshot());

test("test a react component with immutable prop", () =>
  expect(
    jsxToString(<Basic prop={fromJS({ test: "abc" })} />)
  ).toMatchSnapshot());

test("test a react component with multiple children and immutable props", () =>
  expect(
    jsxToString(
      <Basic>
        <BasicChild>
          <BasicChild props={fromJS({ test: "abc" })}>
            <BasicChild>Title</BasicChild>
            <BasicChild>Title 2</BasicChild>
          </BasicChild>
        </BasicChild>
      </Basic>
    )
  ).toMatchSnapshot());

test("test a react single component with ignore tags", () =>
  expect(
    jsxToString(
      <div>
        <Basic>
          <p>Test</p>
        </Basic>
        <span>test</span>
      </div>,
      {
        ignoreTags: ["Basic"]
      }
    )
  ).toMatchSnapshot());

test("test a react component with multiple ignore tags", () =>
  expect(
    jsxToString(
      <Basic>
        <svg />
        <p>Test</p>
        <img />
        <BasicChild />
      </Basic>,
      {
        ignoreTags: ["svg", "img", "BasicChild"]
      }
    )
  ).toMatchSnapshot());

test("test a simple react component with boolean props and shortBooleanSyntax on", () =>
  expect(
    jsxToString(<Basic test test2={false} test3={true} />, {
      shortBooleanSyntax: true
    })
  ).toMatchSnapshot());

test("test a complex react component with boolean props and shortBooleanSyntax on", () =>
  expect(
    jsxToString(
      <Basic
        test="abc"
        test2={4}
        test4={true}
        test5={{ abc: "abc" }}
        test6=""
        test7={false}
        test8
      >
        <BasicChild test1 test2={false} test3={5} test4={6}>
          Title 1
        </BasicChild>
      </Basic>,
      {
        shortBooleanSyntax: true
      }
    )
  ).toMatchSnapshot());

test("test nested components with text in between", () =>
  expect(
    jsxToString(
      <div>
        one
        <div>
          two
          <span>three</span>
        </div>
      </div>
    )
  ).toMatchSnapshot());
