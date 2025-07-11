import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("Button click flow", () => {
  // Render the app.
  render(<App />);
  // Find the button.
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  // Check initial color.
  expect(buttonElement).toHaveClass("red");

  // Click the button.
  fireEvent.click(buttonElement);

  // Check button text.
  expect(buttonElement).toHaveTextContent(/red/i);

  // Check button color.
  expect(buttonElement).toHaveClass("blue");
});
