import React from 'react'

import { Number } from 'react-number'
import 'react-number/dist/index.css'

import numeral from "numeral";
import NP from "number-precision";

const Digit = (props) => {
  const {value} = props;
  return <h2>{value}</h2>
}
const App = () => {
  const [val, setVal] = React.useState(123);

  React.useEffect(() => {
    let next;
    setTimeout(
      (next = () => {
        console.log("setval ", 12345.123);
        setVal(val - 1234);
      }),
      1000
    );
  }, [val]);
  return (
    <div>

      <h2>

      <Number
        value={val}
        numeral={numeral}
        NP={NP}
        strip={8}
        format={"$0,00.00a"}
        ></Number>
      </h2>
    </div>
  );
};

export default App;