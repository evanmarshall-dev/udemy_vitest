import { useState } from "react";
import "./App.css";

function App() {
  // State variables.
  const [buttonColor, setButtonColor] = useState("red");

  // Constants.
  const nextColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div>
      {/* <button className="red">Change to blue</button> */}
      {/* <button className={buttonColor}>Change to blue</button> */}
      <button className={buttonColor} onClick={() => setButtonColor(nextColor)}>
        Change to {nextColor}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
}

export default App;
