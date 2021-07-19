function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var clsx = _interopDefault(require('clsx'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var styles = {"react-number-container":"_1fb2T","react-number-container-digit":"_2O4RQ"};

var CLASSNAME_CONTAINER_NUMBER = "react-number-container";
var CLASSNAME_CONTAINER_DIGIT = "react-number-container-digit";
var CLASSNAME_DIGIT = "react-number-digit";
var STR_EMPTY = '';
var STR_TYPEOF_FUNCTION = 'function';
var STR_TYPEOF_NUMBER = 'number';
var STR_TYPEOF_STRING = 'string';
var DEF_PARAM_NP_STRIP = 4;
var DEF_PARAM_ANIMATE = true;

var Digit = function Digit(props) {
  var value = props.value,
      dir = props.dir,
      renderDigit = props.renderDigit,
      digitClassName = props.digitClassName,
      containerClassName = props.containerClassName;
  var ref = React__default.useRef();

  var _React$useState = React__default.useState(value),
      last = _React$useState[0],
      setLast = _React$useState[1];

  var _React$useState2 = React__default.useState(+new Date()),
      setLastTs = _React$useState2[1];

  var children = Array.from({
    length: 21
  }).map(function (v, i) {
    return i % 10;
  });
  React__default.useEffect(function () {
    if (!ref.current) return;
    var to;
    var n = 0;
    var h = ref.current.querySelector("span").getBoundingClientRect().height;
    var d = 0.3 * Math.min(Math.abs(value - (last + 10)), Math.abs(value - last), Math.abs(value + 10 - last));

    if (dir < 0) {
      if (value > last || last == 9) n = 10;
      ref.current.style.transition = "transform 0ms";
      ref.current.style.transform = "translateY(-" + h * (n + last) + "px)";
      to = setTimeout(function () {
        ref.current.style.transition = "transform " + d + "s";
        ref.current.style.transform = "translateY(-" + h * value + "px)";
      }, 10);
    } else if (dir > 0) {
      ref.current.style.transition = "transform 0s";
      ref.current.style.transform = "translateY(-" + h * last + "px)";
      if (value < last) n = 10;
      to = setTimeout(function () {
        ref.current.style.transition = "transform " + d + "s";
        ref.current.style.transform = "translateY(-" + h * (n + value) + "px)";
      }, 10);
    } else {
      ref.current.style.transition = "transform " + d + "s";
      ref.current.style.transform = "translateY(-" + h * value + "px)";
    }

    setLast(value);
    setLastTs(+new Date());
    return function () {
      clearTimeout(to);
    };
  }, [value]);

  var _containerclassName = clsx(styles[CLASSNAME_CONTAINER_DIGIT], containerClassName);

  var _digitClassName = clsx(styles[CLASSNAME_DIGIT], digitClassName);

  return /*#__PURE__*/React__default.createElement("div", {
    className: _containerclassName,
    ref: ref
  }, children.map(function (value, index) {
    if (STR_TYPEOF_FUNCTION === typeof renderDigit) return /*#__PURE__*/React__default.createElement("span", {
      className: _digitClassName
    }, renderDigit({
      value: value
    }));
    return /*#__PURE__*/React__default.createElement("span", {
      key: index
    }, value);
  }));
};

var classNameDigit = styles[CLASSNAME_CONTAINER_DIGIT];
var classNameNumber = styles[CLASSNAME_CONTAINER_NUMBER];
var regexDigit = /\d/;
var strSplitNumber = STR_EMPTY;
var Number = function Number(props) {
  var value = props.value,
      format = props.format,
      numeral = props.numeral,
      NP = props.NP,
      _props$strip = props.strip,
      strip = _props$strip === void 0 ? DEF_PARAM_NP_STRIP : _props$strip,
      _props$animate = props.animate,
      animate = _props$animate === void 0 ? DEF_PARAM_ANIMATE : _props$animate,
      numberClassName = props.className,
      _props$digitClassName = props.digitClassName,
      digitClassName = _props$digitClassName === void 0 ? 'digit' : _props$digitClassName,
      _props$digitProps = props.digitProps,
      digitProps = _props$digitProps === void 0 ? {} : _props$digitProps;
  var ref = React.useRef();

  var _useState = React.useState(value),
      curValue = _useState[0],
      setCurValue = _useState[1];

  var _useState2 = React.useState(value),
      lastValue = _useState2[0],
      setLastValue = _useState2[1];

  React.useEffect(function () {
    setCurValue(Math.abs(value));
    setLastValue(Math.abs(curValue));
  }, [value]);
  React.useEffect(function () {
    var child = ref.current.querySelector("." + classNameDigit + ">span");
    if (!child) return;
    console.log("NUMBER", child, value);
    var digitHeight = child.getBoundingClientRect().height;
    ref.current.style.height = digitHeight + "px";
  }, [ref.current]);
  var sanitized = value;
  if (STR_TYPEOF_FUNCTION === typeof strip) sanitized = strip(value);

  if (NP && STR_TYPEOF_NUMBER === typeof strip) {
    sanitized = NP.strip(value, 2);
  }

  var numberStr;
  if (STR_TYPEOF_FUNCTION === typeof format) numberStr = format(sanitized);
  if (STR_TYPEOF_FUNCTION === typeof numeral && STR_TYPEOF_STRING === typeof format) numberStr = numeral(sanitized).format(format);
  numberStr = numberStr || sanitized.toString();
  var len = numberStr.length;
  var containerClassName = clsx(classNameNumber, numberClassName);
  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: containerClassName
  }, numberStr.split(strSplitNumber).map(function (_char, index) {
    var digitKey = len - index;
    if (regexDigit.test(_char)) return /*#__PURE__*/React__default.createElement(Digit, _extends({
      ref: ref,
      key: digitKey,
      value: +_char,
      dir: Math.sign(curValue - lastValue),
      animate: animate,
      className: digitClassName
    }, digitProps));
    if (STR_TYPEOF_FUNCTION === typeof digitProps.renderDigit) return /*#__PURE__*/React__default.createElement("span", null, digitProps.renderDigit({
      value: _char
    }));
    return /*#__PURE__*/React__default.createElement("span", null, _char);
  }));
};

exports.Number = Number;
//# sourceMappingURL=index.js.map
