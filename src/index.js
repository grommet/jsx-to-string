function isDefaultProp(defaultProps, key, value) {
  if (!defaultProps) {
    return false;
  }
  return defaultProps[key] === value;
}

function jsxToString(component, options) {

  let componentData = {
    name: component.type.displayName || component.type
  };

  let opts = Object.assign({
    functionValue: {}
  }, options);

  if (component.props) {
    componentData.props = Object.keys(component.props).map(
      (key) => {
        if (key === 'children' ||
          isDefaultProp(component.type.defaultProps, key, component.props[key])) {
          return '';
        } else {
          let value = component.props[key];
          if (typeof value === 'string') {
            return ` ${key}="${value}"`;
          } else if (typeof value === 'object') {
            value = JSON.stringify(value, null, 2);
          } else if (typeof value === 'function') {
            value = opts.functionValue[key] || '...';
          }
          return ` ${key}={${value}}`
        }
      }
    ).join('');
  }

  let indentation = '';
  if (opts.spacing) {
    indentation = new Array(opts.spacing + 1).join(' '); //repeating empty spaces
  }

  if (component.props.children) {
    opts.spacing = 2;
    var textIndentation = new Array(opts.spacing + 1).join(' ');
    if (typeof component.props.children === 'string') {
      componentData.children = textIndentation + component.props.children;
    } else if (typeof component.props.children === 'object' &&
      !Array.isArray(component.props.children)) {
      componentData.children = jsxToString(component.props.children, opts);
    } else {
      componentData.children = component.props.children.map((child) => {
        if (typeof child === 'string') {
          return textIndentation + child;
        } else {
          return jsxToString(child, opts);
        }
      }).join('\n');
    }
    return `${indentation}<${componentData.name}${componentData.props}>\n${indentation}${componentData.children}\n${indentation}</${componentData.name}>`;
  } else {
    return `${indentation}<${componentData.name}${componentData.props} />`;
  }
};

export default jsxToString;
