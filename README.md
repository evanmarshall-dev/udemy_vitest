# Udemy: React Testing Library - Vitest

> [!NOTE]
>
> [Course GitHub Repo](https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/main)

## Module: First Test

1. complete environment setup found in the `README.md` in **vite-starter** in the course repo.

### `App.test.jsx`

This file contains a test for the `App` component to be run in the CLI using: `pnpm test`.

Breaking down the syntax:

```jsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("App contains correct heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/learn react/i);
  expect(headingElement).toBeInTheDocument();
});
```

- `render`: The render method comes from `@testing-library/react` and creates the **simulated DOM**. It allows the test to understand what we are testing against. It creates the **simulated DOM** for whatever JSX you give it as an _argument_ (i.e. `<App />` component).
- `screen`: Once it has been rendered the **simulated DOM** can be accessed via the **global object** called `screen` (Also imported from `@testing-library/react`).
- `screen.getByText`: Is a method of `screen`. It is looking at the **simulated DOM** and it is trying to find an element that matches the text we give it as an _argument_ (i.e. `/learn react/i`). In this example we passed in a regular expression (regex) denoted by the forward slashes and there is an `i` flag to say it is **case insensitive** (The _argument_ can also be an exact _string_, but regex are more flexible).
- `const headingElement`: If there is any element within the rendered **simulated DOM** whose display text matches the regex it will be stored in the `headingElement` variable.
- `expect(headingElement).toBeInTheDocument()`: Is not part of the testing library. It is part of **vitest** (Syntax is the same in Jest). This is **asserting** and can cause the test to _succeed_ or _fail_. We are asserting that the `headingElement` returned by the `getByText` method is _in_ the document. If it is, the statement will be true and the test will _succeed_ otherwise the test will _fail_.

> [!NOTE]
> Running Vitest in `--watch` mode will auto re-run test when a change has been made.

## Module: Assertions

**Assertions** determine whether a test passes or fails.

### Syntax of an Assertion

- `expect`: All assertions start with an `expect` method which is a **global** in Jest or Vitest.
- `expect(argument)`: The _argument_ is what you are asserting against. It is what Vitest will examine to see if it meets our expectation.
- `toBeInTheDocument`: Is a **matcher** and is what the assertion **type** is.
- `toBeInTheDocument(argument)`: Sometimes there is an _argument_ passed into the **matcher**. To be in the document does not have an _argument_ (It is either in the document or not). Sometimes you are comparing the element to some sort of known quantity which would need an _argument_.

### More Examples of Assertion

- `expect(element.textContent).toBe('hello');`: Most likely using a screen method to find the element on the page. Text content is self explanatory and the **matcher** (`toBe`) takes a _argument_ for an exact string (i.e. `hello`).
- `expect(elementsArray).toHaveLength(7);`: The `elementsArray` would have been defined in the previous line. It has a **matcher** of `toHaveLength` with an _argument_ of `7`.

### jest-DOM

Can also be used with Vitest as well as Jest. If it is used it needs to be _imported_ prior to each test in order to be able to use the **matchers** with **jest-DOM**.

Both Jest and/or Vitest use a setup file to import the **jest-DOM** for each test (`/src/setupTests.js`).

Once it is imported it allows you to use **matchers** specific to the DOM. The above examples show more general **matchers**. Below are DOM-specific **matchers**:

- `toBeVisible()`
- `toBeChecked()`
- `toBeInTheDocument()`
