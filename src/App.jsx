import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("0");

  const numberInput = (event) => {
    const key = event.target.innerHTML;
    const regexNumberDot = /^[0-9.]+$/;
    const regexDot = /[.]/;

    //clear line1 if line2 has no numbers
    if (!regexNumberDot.test(line2)) setLine2("");
    //clear line1 if user starts with number
    line2 === "" && regexNumberDot.test(key) && setLine1("");
    //clear initial value of line2
    line2 === "0" && setLine2("");
    //stop user from type zeros as input
    if (line2 === "0" && key === "0") return;
    //stop user from adding more than one period
    if (regexDot.test(line2) && key === ".") return;

    setLine1((prev) => prev + key);
    setLine2((prev) => prev + key);
  };

  function operationInput(event) {
    const key = event.target.innerHTML;
    setLine2(key);
    const regex = /[\/\*\+]$/;
    if (line2 !== "" && regex.test(line1) && key !== "-") {
      setLine1((prev) => prev.slice(0, -1) + key);
      return;
    }
    setLine1((prev) => prev + key);
  }

  function clear() {
    setLine1("");
    setLine2("0");
  }

  function result() {
    const regex = /[\/\*\+\-]$/;
    if (line2 === "" || regex.test(line1)) return;
    const equation = line1;
    eval(equation) ? setLine1(eval(equation)) : setLine1("error");
    setLine2("");
  }

  function backspace() {
    setLine1((prev) => prev.slice(0, -1));
    line2.length > 0 ? setLine2((prev) => prev.slice(0, -1)) : setLine2("");
  }

  return (
    <div className="App" id="calculator">
      <div id="display">
        <div className="formulaScreen">{line1}</div>
        <div className="outputScreen">{line2}</div>
      </div>
      <div className="buttons">
        <button onClick={clear} className="ac" id="clear">
          AC
        </button>
        <button onClick={backspace} className="backspace" id="backspace">
          ←
        </button>
        <button onClick={operationInput} className="operation" id="divide">
          /
        </button>
        <button onClick={operationInput} className="operation" id="multiply">
          *
        </button>
        <button onClick={numberInput} className="digit" id="seven">
          7
        </button>
        <button onClick={numberInput} className="digit" id="eight">
          8
        </button>
        <button onClick={numberInput} className="digit" id="nine">
          9
        </button>
        <button onClick={operationInput} className="operation" id="subtract">
          -
        </button>
        <button onClick={numberInput} className="digit" id="four">
          4
        </button>
        <button onClick={numberInput} className="digit" id="five">
          5
        </button>
        <button onClick={numberInput} className="digit" id="six">
          6
        </button>
        <button onClick={operationInput} className="operation" id="add">
          +
        </button>
        <button onClick={numberInput} className="digit" id="one">
          1
        </button>
        <button onClick={numberInput} className="digit" id="two">
          2
        </button>
        <button onClick={numberInput} className="digit" id="three">
          3
        </button>
        <button onClick={result} className="equals" id="equals">
          =
        </button>
        <button onClick={numberInput} className="digit zero" id="zero">
          0
        </button>
        <button onClick={numberInput} className="dot" id="decimal">
          .
        </button>
      </div>
      <span className="sig">Ramon Pacheco - Apr. 2023</span>
    </div>
  );
}
