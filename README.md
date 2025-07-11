# Udemy: React Testing Library - Vitest

> [!NOTE]
>
> [Course GitHub Repo](https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/main)

## Section: Introduction

### Module: First Test :1st_place_medal:

1. complete environment setup found in the `README.md` in **vite-starter** in the course repo.

#### `App.test.jsx`

This file contains a test for the `App` component to be run in the CLI using: `pnpm test`.

Breaking down the syntax:

```jsx
// file: ./src/App.test.jsx

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

### Module: Assertions :fist_raised:

**Assertions** determine whether a test passes or fails.

#### Syntax of an Assertion

- `expect`: All assertions start with an `expect` method which is a **global** in Jest or Vitest.
- `expect(argument)`: The _argument_ is what you are asserting against. It is what Vitest will examine to see if it meets our expectation.
- `toBeInTheDocument`: Is a **matcher** and is what the assertion **type** is.
- `toBeInTheDocument(argument)`: Sometimes there is an _argument_ passed into the **matcher**. To be in the document does not have an _argument_ (It is either in the document or not). Sometimes you are comparing the element to some sort of known quantity which would need an _argument_.

#### More Examples of Assertion

- `expect(element.textContent).toBe('hello');`: Most likely using a screen method to find the element on the page. Text content is self explanatory and the **matcher** (`toBe`) takes a _argument_ for an exact string (i.e. `hello`).
- `expect(elementsArray).toHaveLength(7);`: The `elementsArray` would have been defined in the previous line. It has a **matcher** of `toHaveLength` with an _argument_ of `7`.

#### jest-DOM

Can also be used with Vitest as well as Jest. If it is used it needs to be _imported_ prior to each test in order to be able to use the **matchers** with **jest-DOM**.

Both Jest and/or Vitest use a setup file to import the **jest-DOM** for each test (`/src/setupTests.js`).

Once it is imported it allows you to use **matchers** specific to the DOM. The above examples show more general **matchers**. Below are DOM-specific **matchers**:

- `toBeVisible()`
- `toBeChecked()`
- `toBeInTheDocument()`

### Module: How Tests Work :construction_worker_man:

There is a division of responsibilities between React Testing Library (RTL) and Jest/Vitest.

RTLs job is to create a **simulated DOM** for your components which you can then use for _interactions_ and _assertions_.

You _cannot_ use RTL without a test runner. A test runner will _find_ the tests, _run_ the test, and make _assertions_. This is where Jest/Vitest comes in.

> [!NOTE]
>
> - Vitest is 3x - 5x faster than Jest.
> - Jest is harder to configure for Vite.
> - However Jest tends to work better with Next.js.
> - Less advanced syntax is virtually identical between the two test runners, only the setup differs.

Both Jest/Vitest have a **global** `test` method that takes two _arguments_:

1. A string description of the test.
2. A test function to run for test pass/fail.

The test fails if there is an error when the second _argument_ function runs.

**Assertions** _throw errors_ when the expectation fails. If no error thrown then the test passes (Meaning an empty test passes or a test where everything inside the **global** `test` method is empty).

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

// Empty Test.
test("Empty Test", () => {});

// Throw Error Explicitly.
test("Test throws error explicitly", () => {
  throw new Error("Fail this test!");
});
```

With RTL the part of the code that will throw an error is the **assertion**.

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

// RTL Assertion Error.
test("App contains correct heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/learn react/i);
  // Error thrown with .not.
  expect(headingElement).not.toBeInTheDocument();
});
```

### Module: Test Driven Development (TDD) :test_tube:

Writing tests _before_ writing the code then write the code according to specs set by the tests to make the tests _pass_.

#### Red-Green Testing

You want the tests to _fail_ (red tests) _before_ the code is written the _after_ the code is written you see _passing_ tests (green tests).

1. You write an empty function or empty functional React component.
2. You write your tests and expect them to _fail_ because empty functions.
3. Write your code and expect the tests to _pass_.

### Module: React Testing Library (RTL) Philosophy :man_student:

It is **opinionated** or drives you towards best practices when React testing.

#### What Does RTL Do?

- Creates a **virtual DOM** for testing.
  - Provides utilities for interacting with said DOM (i.e. Find elements in the DOM or interact with elements).
- Allows for testing _without_ a browser.

#### Types of Tests

- Unit Tests.
  - Test one unit of code in isolation.
- Integration Tests.
  - Tests how multiple units work together (i.e. Interaction between components).
- Functional Tests.
  - Tests a particular function of the software (You are not testing your code but rather its behaviour). RTL _encourages_ this type of test.
- Acceptance/End-to-End Tests (E2E).
  - These tests require a browser and server that your app is connected to (Require a special tool such as Cypress or Selenium). RTL is _not_ built for these types of tests.

### Module: Functional Testing vs Unit Testing :bar_chart:

#### Unit Testing

With unit testing you want your tests to be as isolated as possible. You do this by _mocking_ your components dependencies (Use test version of a function for example that the component relies on). Sometimes you also test _internals_ (i.e. Testing differences it made to the state because you do not have other components to see what it did to the app).

**Pro**: Since unit testing is isolated it is easier to pinpoint _failures_.

**Con**: It is further from how a user would interact with your software. It is also more likely to break with _refactoring_ (Refactoring: Change how code is written, but not its functionality and with unit testing you are testing how the code is written).

#### Functional Testing (RTL Preferred)

With functional testing you include all relevant units for a particular behaviour or user flow.

**Pro**: Close to how a user would interact with your software. They are also more robust tests so if you refactor it should still _pass_.

**Con**: More difficult to debug failing tests because they aren't as tightly coupled to the code.

> [!NOTE]
> There is also such thing as **Behaviour Driven Development (BDD)**, but it requires multiple teams and collaboration.

### Module: How Testing Library Finds Elements on the Page :fire:

Testing library suggests to find elements using **accessibility** handles. This is a better way to test as well as ensuring that your app is accessible to users.

`getByRole` is the top **priority** recommended. Some roles are: [MDN ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Techniques).

Other accessibility options if `getByRole` is not available (i.e. for form inputs) you can use `getByLabelText` or `getByPlaceholderText`.

**Semantic queries** such as `getByAltText` and `getByTitle` are also good.

**Test IDs** are a last resort (i.e. `getByTestID`).

Back in our code for `App.test.jsx` we are using the frowned upon `getByText` method. We can switch it to an **ARIA: heading role** to utilize accessibility handles. When you use `getByRole` there are several options, but the most common one to use is `name` which can also take either a regex or string.

For example:

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

test("App contains correct heading", () => {
  render(<App />);
  // const headingElement = screen.getByText(/learn react/i);
  // SWITCH TO ROLE
  const headingElement = screen.getByRole("heading", { name: /learn react/i });
  expect(headingElement).toBeInTheDocument();
});
```

## Section: App - Color Button

### Module: Getting Started with App

1. _Remove_ the `h1` element in `App.jsx` (`<h1>I'm gonna learn React Testing Library</h1>`) and the sample test in `App.test.jsx`.
2. In `App.test.jsx` we will now create _three_ tests that all start with the keyword `test`.
3. **Test #1** will check to see if the button starts with the correct color. First _argument_ is the test description and the second _argument_ is the function that determines _pass_/_fail_.
4. **Test #2** will check if the button starts with the correct text.
5. **Test #3** and **#4** will duplicate the first two tests but for after the button click.
6. Next thing we do is `render` and we will `render` the app component.
7. Then we will use `screen` to find the element we are looking for (i.e. `button`). We will append `.getByRole` to `screen` and pass in the role of `button` to `getByRole`. Save the `screen` into a variable (i.e. `buttonElement`).
8. To determine color we will use the **jest-DOM** **matcher** of `toHaveClass()`. First we pass in the `buttonElement` constant into `expect` and append `.toHaveClass()` to `expect`. Pass in a string of `"red"` to `toHaveClass` to represent a class of red (_Anticipating_ making a class with the name of red and assigning the button that class initially).
9. The arguments for getByRole are creating **assertions**. We can have more than one **assertion**, but it is not necessary in a front end test so we can just add it as a second _argument_ to `getByRole` in the first **assertion**. The second **assertion** will be as follows: `{name: /blue/i}` since the button will start out with a text change to blue.

Currently we will have the first test _fail_ because we have no buttons with the text of blue and two tests will _pass_ which are the last two _empty_ tests (The red part of red-green testing).

**_For example_**:

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

// BEFORE CLICKING BUTTON.
test("button starts with correct color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  expect(buttonElement).toHaveClass("red");
});

// ? test("button starts with correct text", () => {});

// AFTER CLICKING BUTTON.
test("button has correct color after click", () => {});

test("button has correct text after click", () => {});
```

### Module: Method for Debugging Roles `logRoles`

Let's say you did not know the role was button we can use `logRoles` from **testing library DOM**.

1. If we want to see what the roles are in the app we can **destructure** `container` from the output of the `render`: `const { container } = render(<App />);`.
2. Run `logRoles` on the above `container`: `logRoles(container);`.

**_For Example_**:

```jsx
// file: ./src/App.test.jsx

import { render, screen } from "@testing-library/react";
import { logRoles } from "@testing-library/dom";
import App from "./App";

test("button starts with correct color", () => {
  const { container } = render(<App />);
  logRoles(container);
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  expect(buttonElement).toHaveClass("red");
});

test("button has correct color after click", () => {});

test("button has correct text after click", () => {});
```

The `logRoles` now provides some output. A button and what its name is:

```sh
# CLI Output

button:

Name "Change to blue":
<button
  class="red"
/>
```

> [!NOTE]
> It is not much because of only one component, but useful in large apps when you are not sure of all the **roles**.
