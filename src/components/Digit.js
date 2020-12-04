import clsx from "clsx";
import React from "react";
import { CLASSNAME_CONTAINER_DIGIT, CLASSNAME_DIGIT, STR_TYPEOF_FUNCTION } from '../consts';
import styles from '../styles.module.css';

/**
 * Properties of the <Digit /> component
 * @description Test
 * @typedef {object} DigitProps 
 * @property {Number} value - The digit to be displayed.
 * @property {Boolean} animated - Disable animation.
 * @property {Number} dir - Direction of the animation. -1 - down | 0 - nearest | +1 up
 * @property {Function} renderDigit - Render function that renders a digit.
 * @property {String} containerClassName - Additional className for the container
 * @property {String} digitClassName - Additional className for the Digit
 */

 /**
  * Renders a single animated digit.
  * @param {DigitProps} props 
  */
export const Digit = (props) => {
  const { value, dir, renderDigit, digitClassName, containerClassName } = props;
  const ref = React.useRef();

  const [last, setLast] = React.useState(value);
  const [ts, setLastTs] = React.useState(+new Date());

  const children = Array.from({ length: 21 }).map((v, i) => i % 10);

  React.useEffect(() => {
    if (!ref.current) return;
    /**@type NodeJS.Timeout */
    let to;
    let n = 0;

    const h = ref.current.querySelector("span").getBoundingClientRect().height;
    const o = h * value;
    const d =
      0.3 *
      Math.min(
        Math.abs(value - (last + 10)),
        Math.abs(value - last),
        Math.abs(value + 10 - last)
      );
    if (dir < 0) {
      if (value > last || last == 9) n = 10;
      ref.current.style.transition = `transform 0ms`;
      ref.current.style.transform = `translateY(-${h * (n + last)}px)`;

      to = setTimeout(() => {
        ref.current.style.transition = `transform ${d}s`;
        ref.current.style.transform = `translateY(-${h * value}px)`;
      }, 10);
    } else if (dir > 0) {
      ref.current.style.transition = `transform 0s`;
      ref.current.style.transform = `translateY(-${h * last}px)`;
      if (value < last) n = 10;
      to = setTimeout(() => {
        ref.current.style.transition = `transform ${d}s`;
        ref.current.style.transform = `translateY(-${h * (n + value)}px)`;
      }, 10);
    } else {
      ref.current.style.transition = `transform ${d}s`;
      ref.current.style.transform = `translateY(-${h * value}px)`;
    }

    setLast(value);
    setLastTs(+new Date());

    return () => {
      clearTimeout(to);
    };
  }, [value]);

  const _containerclassName = clsx(styles[CLASSNAME_CONTAINER_DIGIT], containerClassName);
  const _digitClassName = clsx(styles[CLASSNAME_DIGIT], digitClassName);

  return (
    <div className={_containerclassName} ref={ref}>
      {children.map((value, index) => {
        if (STR_TYPEOF_FUNCTION === typeof renderDigit) return <span className={_digitClassName}>{renderDigit({value})}</span>
        return <span key={index}>{value}</span>;
      })}
    </div>
  );
};
