import { useState } from "react";
import "./App.css";

function App() {
  // State variables.
  const [buttonColor, setButtonColor] = useState("red");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Constants.
  const nextColor = buttonColor === "red" ? "blue" : "red";
  const className = buttonDisabled ? "gray" : buttonColor;

  return (
    <div>
      {/* <button className={buttonColor}>Change to blue</button> */}
      <button
        // className={buttonColor}
        className={className}
        onClick={() => setButtonColor(nextColor)}
        disabled={buttonDisabled}
      >
        Change to {nextColor}
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
