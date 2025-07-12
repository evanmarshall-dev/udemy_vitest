import { useState } from "react";
import "./App.css";
import { kebabCaseToTitleCase } from "./helpers";

function App() {
  // State variables.
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Constants.
  const nextColorClass =
    buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const className = buttonDisabled ? "gray" : buttonColor;
  const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass);

  return (
    <div>
      {/* <button className={buttonColor}>Change to blue</button> */}
      <button
        // className={buttonColor}
        className={className}
        onClick={() => setButtonColor(nextColorClass)}
        disabled={buttonDisabled}
      >
        {/* Change to {nextColor} */}
        Change to {nextColorTitleCase}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        checked={buttonDisabled}
        onChange={(e) => setButtonDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
}

export default App;
