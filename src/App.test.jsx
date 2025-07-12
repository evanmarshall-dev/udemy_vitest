import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { expect, describe } from "vitest";
import { kebabCaseToTitleCase } from "./helpers";

test("Button click flow", () => {
  // Render the app.
  render(<App />);
  // Find the button.
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  // Check initial color.
  expect(buttonElement).toHaveClass("medium-violet-red");

  // Click the button.
  fireEvent.click(buttonElement);

  // Check button text.
  expect(buttonElement).toHaveTextContent(/red/i);

  // Check button color.
  expect(buttonElement).toHaveClass("midnight-blue");
});

test("Checkbox flow", () => {
  render(<App />);

  // Find elements.
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // Check initial conditions.
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // Check the checkbox to disable button.
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // Click checkbox again to re-enable button.
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");
});

test("Checkbox flow after button clicked", () => {
  render(<App />);

  // Find elements.
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // Click the button.
  fireEvent.click(buttonElement);

  // Check the checkbox to disable button.
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // Click checkbox again to re-enable button.
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");
});

describe("kebabCaseToTitleCase", () => {
  test("Works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("Works for one hyphens", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("Works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
