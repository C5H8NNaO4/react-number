import React, { Fragment,useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

// @ts-ignore
import styles from '../styles.module.css';

import { Digit, DigitProps } from "./Digit";
import { CLASSNAME_CONTAINER_NUMBER, CLASSNAME_CONTAINER_DIGIT, STR_EMPTY, STR_TYPEOF_FUNCTION, STR_TYPEOF_NUMBER,STR_TYPEOF_STRING, DEF_PARAM_NP_STRIP, DEF_PARAM_ANIMATE } from '../consts';

const classNameDigit = styles[CLASSNAME_CONTAINER_DIGIT];
const classNameNumber = styles[CLASSNAME_CONTAINER_NUMBER];
const regexDigit = /\d/;
const strSplitNumber = STR_EMPTY;

/**
 * @typedef NumeralLibrary
 * @type {Function}
 * @description - The numeral npm package.
 */

 /**
 * @typedef NumberPrecisionLibrary
 * @type {Object}
 * @property {Function} strip - Function that strips IEE754 imprecision.
 * @description - The number-precision npm package.
 */


/**
 * Displays <Numbers>.
 * Animated number effect as similar to the one seen on reddit. - Supports numeral library for formatting and number-precision for sanitizing input.
 * @param {object} props - React properties.
 * @param {Number} props.value - The value as number or string.
 * @param {function|string} props.format - A function that formats a number. - Can be a string if numeral param is set.
 * @param {NumeralLibrary} props.numeral - The numeral library.
 * @param {function|number} props.strip - Function to sanitize numerical value. Can be a number if NP param is set and will be used as the number of digits of precision to strip IEE754 floating point up to. 0.3 - 0.2 == 0.1. Needs `props.NP` set.
 * @param {NumberPrecisionLibrary} props.NP - The number-precision library. 
 * @param {String} props.className - Additional className for the <Number /> component.
 * @param {String} props.digitClassName - Additional className for the <Digit /> component.
 * @param {DigitProps} props.digitProps - Additional properties passed to the Digit component.
 * @param {Boolean} props.animate - Enable/Disable animation.
 */
export const Number = (props) => {
  const { value, format, numeral, NP, strip = DEF_PARAM_NP_STRIP, animate = DEF_PARAM_ANIMATE, className: numberClassName, digitClassName, digitProps = {}} = props;

  /**@type {Object} */
  const ref = useRef();

  const [curValue, setCurValue] = useState(value);
  const [lastValue, setLastValue] = useState(value);

  useEffect(() => {
    setCurValue(Math.abs(value));
    setLastValue(Math.abs(curValue));
  }, [value]);

  useEffect(() => {
    const child = ref.current.querySelector(`.${classNameDigit}>span`);
    const digitHeight = child.getBoundingClientRect().height;
    ref.current.style.height = `${digitHeight}px`;
  }, [ref.current]);

  let sanitized = value;

  // @ts-ignore
  if (STR_TYPEOF_FUNCTION === typeof strip) sanitized = strip(value);

  if (NP && STR_TYPEOF_NUMBER === typeof strip) {
    sanitized = NP.strip(value, 2);
  }

  let numberStr;
  
  // @ts-ignore
  if (STR_TYPEOF_FUNCTION === typeof format) numberStr = format(sanitized);

  if (STR_TYPEOF_FUNCTION === typeof numeral && STR_TYPEOF_STRING === typeof format)
    numberStr = numeral(sanitized).format(format);

  numberStr = numberStr || sanitized.toString();

  const len = numberStr.length;
  const containerClassName = clsx(classNameNumber, numberClassName);
  return (
      <div ref={ref} className={containerClassName}>
        {numberStr.split(strSplitNumber).map((char, index) => {
          const digitKey = len - index;

          if (regexDigit.test(char))
            return <Digit ref={ref} key={digitKey} value={+char} dir={Math.sign(curValue - lastValue)} animate={animate} className={digitClassName} {...digitProps} />;
            
          if (STR_TYPEOF_FUNCTION === typeof digitProps.renderDigit)
            return <span>{digitProps.renderDigit({value: char})}</span>;

          return <span>{char}</span>;
        })}
      </div>
  );
};
