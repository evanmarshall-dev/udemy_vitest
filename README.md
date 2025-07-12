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

**_For example_**:

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

**_For example_**:

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

### Module: Test Behaviour with Button Click

It is common to have longer tests with multiple _assertions_ that test a particular flow.

To click the button we can use `fireEvent` from **testing library react** (There is a more involved `userEvent` which we will look at later).

1. Add `fireEvent` and append `.click()` method.
2. Pass in what to click, which is the `buttonElement`.
3. Skip down a step and add the assertion to check button color after click. We will use the same as before click, but `toHaveClass` of blue instead of red: `expect(buttonElement).toHaveClass("blue");`.
4. For checking the button text we will be using a new _matcher_ from **jest-DOM** (`toHaveTextContent`). We always start an assertion with `expect`, then we will pass in the `buttonElement`, append `.toHaveTextContent()`, and pass a regex for text of `red` into the new _matcher_: `expect(buttonElement).toHaveTextContent(/red/i);`.

Since we are currently in the red portion of _red-green_ testing the test will _fail_. When the button is clicked the text content does not include regex of red.

**_For example_**:

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

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
```

### Module: Change Button Color on Click with React

We just finished the failing/red code for testing.

1. Go to `App.jsx` and within the `App` component we will use **state** to track what the button color is.
2. Assign `useState` to **destructured** `buttonColor` **state variable** and `setButtonColor` **setter function**. The initial state for the button will be `"red"`: `const [buttonColor, setButtonColor] = useState("red");`.
3. Instead of the button `className` being `"red"` we will assign it to whatever the **state variable** `buttonColor` is: `<button className={buttonColor}>Change to blue</button>`.
4. The button text content will display whatever the opposite of the button color is. We can derive that from the current state and call it `nextColor`. _If_ the button color is red (`buttonColor === "red"`) _then_ next color is blue (`? "blue"`), _else_ the next color is red (`: "red"`) using **ternary** operators: `const nextColor = buttonColor === "red" ? "blue" : "red";`.
5. We now have to give the button an on click event. The `onClick` takes a _return_ function that returns the **setter function** (`setButtonColor`) with a value passed in of `nextColor`: `<button className={buttonColor} onClick={() => setButtonColor(nextColor)}>`. We change the color button state to whatever the `nextColor` is on click.
6. Lastly, we need to make the blue class and set styles in `App.css`.

For example:

```jsx
// file: ./src/App.jsx

// OTHER CODE...

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
    </div>
  );
}

// OTHER CODE...
```

> [!NOTE]
> You will notice that the tests pass even before we add the blue button color styles. It is quite complicated to test for actual styles versus testing for classes.

#### Testing for Styles

To test for styles you need to make sure the css is being interpreted as part of your tests.

- In the `vite.config.js` it is one line that says: `css: true,`.
- With Jest it is quite slow and requires some extra plugins.
- It is not always obvious what the styles come out as. For example if we switch the last _assertion_ in our test to: `expect(buttonElement).toHaveStyle({"background-color": "blue"});` then it will `fail` because the blue style will render as an RGB value (`rgb(0, 0, 255)`) instead of `"blue"`.
- It is more straightforward to just test for classes and use **visual regression testing** to catch any visual style (More advanced).

### Module: Button and Checkbox Test

Now we will add a checkbox that when checked the button is disabled and enabled when unchecked.

We will make a new test to separate the button click flow from the checkbox flow.

1. Back in `App.test.jsx` we will add a new test. Start with using `test` global from **Vitest** which takes two _arguments_ (1. The _name_ of the test, 2. _function_ for pass/fail): `test("Checkbox flow", () => {});`.
2. Start by _rendering_ something, usually a component: `render(<App />);`.
3. We need to find the button and the checkbox because we want to check initially that the checkbox is checked and the button is enabled.
4. Find button by using the `screen` object (That has access to the **simulated DOM** that the `render` created). We then append `.getByRole()` and pass in `"button"`, and second _argument_ is the expectant name as regex blue (Because the button starts out red and changes to blue): `const buttonElement = screen.getByRole("button", { name: /blue/i });`.
5. Find the checkbox. Follow the same steps as finding the button, use **checkbox role** passed into `getByRole()`, second _argument_ being `name` (Even though `name` is not necessary because there is only one checkbox on the page), and assign to variable `checkboxElement`. The `name` will be the accessible name for the checkbox which will be the label for the input: `const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i,});`.
6. Initial conditions are the button enabled and checkbox unchecked. Start by creating an _assertion_ which starts with an `expect`. Pass in `buttonElement` to `expect` and append a **matcher** to this (i.e. `toBeEnabled` for button and `toBeChecked` for checkbox). The `toBeEnabled()` has no _argument_ because it is either enabled or disabled: `expect(buttonElement).toBeEnabled();`.
7. Another assertion that checks NOT condition for `toBeChecked` since there is no built in `toNotBeChecked`: `expect(checkboxElement).not.toBeChecked();`.

**_For example_**:

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

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
});
```

Check that the tests are currently _red_ (It cannot find the checkbox because it has not be created yet).

#### Add the React code

1. Go to `App.jsx` and add a checkbox input. Make sure to add `id` of `disabled-button-checkbox` (This will make it accessible to screen readers and our tests).
2. Set the checkbox to not be checked by default: `<input type="checkbox" id="disabled-button-checkbox" defaultChecked={false} />`.
3. Add label and associate it to the checkbox input id using `htmlFor`: `<label htmlFor="disable-button-checkbox">Disable Button</label>`.

**_For example_**:

```jsx
// file: ./src/App.jsx

// OTHER CODE...

<input
  type="checkbox"
  id="disable-button-checkbox"
  defaultChecked={false}
/>
<label htmlFor="disable-button-checkbox">Disable Button</label>

// OTHER CODE...
```

Now the tests are passing or _green_.

### Module: Code Quiz Button Checkbox Logic and Test

#### Tests

- Add to the _current_ test.
- We want to use `fireEvent` _twice_. When the checkbox is checked and when the checkbox is unchecked.
- Check that the button is enabled when checkbox is unchecked (Done) and that the button is disabled when the checkbox is checked.
- For _assertion_ **matchers** on the button we will again use `toBeEnabled()` and `toBeDisabled()`.

#### React Logic

- Checkbox controls the button via a boolean state.
- State will determine the value of `disabled` attribute on the button.
- Calling the state variable `disabled` and initial value of state to be set to `false`.
- The onChange for the checkbox will set that state to whether the target (checkbox) of the event is checked or not: `{(e) => setDisabled(e.target.checked)}`.

#### Code Quiz Solution

1. Add to the checkbox flow test.
2. Use `fireEvent.click` on the `checkboxElement` followed by _expectation_ that the `buttonElement` will be `disabled`.
3. Use `fireEvent.click` on the `checkboxElement` again followed by an _expectation_ that the `buttonElement` will be re-enabled.

**_For example_**:

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

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

  // Click checkbox again to re-enable button.
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
});
```

1. Create new state called `isDisabled`: `const [isDisabled, setIsDisabled] = useState("false");`.
2. The `defaultChecked` prop (Checked or unchecked) on the checkbox will rely on the state `isDisabled`: `<input defaultChecked={isDisabled} />`.
3. When the checkbox changes (`onChange`) we update the state: `<input onChange={(e) => setIsDisabled(e.target.checked)} />`.
4. Also use the `isDisabled` state to determine whether the button is disabled or not: `<button disabled={isDisabled}>...</button>`.

**_For example_**:

```jsx
// file: ./src/App.jsx

// OTHER CODE...

const [buttonDisabled, setButtonDisabled] = useState(false);

// OTHER CODE...

<button
  className={buttonColor}
  onClick={() => setButtonColor(nextColor)}
  disabled={buttonDisabled}
>
  Change to {nextColor}
</button>
<br />
<input
  type="checkbox"
  id="disable-button-checkbox"
  // defaultChecked={disabled}
  checked={buttonDisabled}
  onChange={(e) => setButtonDisabled(e.target.checked)}
/>

// OTHER CODE...
```

#### Code Quiz 2 Solution (Button Grey when Disabled)

1. Add _assertion_ when checkbox is checked to check if button has class of `"gray"`: `expect(buttonElement).toHaveClass("gray");`. Add to original checkbox flow.
2. Add _assertion_ when checkbox is unchecked to check if button has class of `"red"`: `expect(buttonElement).toHaveClass("red");`. Add to original checkbox flow.
3. Create a new checkbox flow for what happens after the button has been clicked (i.e. turns blue). The new checkbox flow will be the same as original except that we add a `fireEvent.click(buttonElement)` after we find the elements and remove the checking of initial conditions for checkbox and button.

**_For example_**:

```jsx
// file: ./src/App.test.jsx

// OTHER CODE...

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
  expect(buttonElement).toHaveClass("red");
});
```

> [!TIP]
> For test code it is less important for the code to be **DRY** than being able to debug failing tests quickly (Readable).

1. Create `className` constant equal to condition of `buttonDisabled` would be `"gray"` and if not it will be set to whatever the `buttonColor` state is: `const className = buttonDisabled ? "gray" : buttonColor;`.
2. Assign the constant `className` to the `className` of the button: `<button className={className}>...</button>`.
3. Add styles to `App.css` for the background color of gray.

### Module: Unit Testing Functions

Sometimes you will have functions separate from components due to being used by several other components or because it is complex and needs modularity.

If we were to use more complicated colors classes (i.e. `.midnight-blue`) it will work when we have to set the button color (`useState=("midnight-blue")`), but it will not look great when we are looking at the button text.

1. Create a file called `helpers.js`.
2. Within helpers.js add an export for a function that converts kebab case to title case. Leave the function empty: `export function kebabCaseToTitleCase() {}`.
3. In the `App.test.jsx` we are going to add a new _global_ called `describe()` (A way to group tests). It takes the same two arguments as `test()` and it allows us to _route_ multiple tests within it's second _argument_ function.
4. Within describes second argument we will add a test for if it works with no hyphens, one hyphen, and multiple hyphens.
5. In the _no hyphen_ test we write an _assertion_ to `expect` kebab case helper function lowercase `"red"` to be uppercase `"Red"`: `expect(kebabCaseToTitleCase("red")).toBe("Red");`.
6. For _one hyphen_ we will look at `midnight-blue` class name, which is what we will be working with in the _state_. We will use the helper function to translate that to `"Midnight Blue"`.
7. Lastly, for _multiple hyphens_ we will look at `medium-violet-red` class name.

We will have 6 _failing_ tests at this point due to the `buttonColor` name changes and the three grouped tests in the **describe global**.

#### Write the Helper Function Code

1. The `kebabCaseToTitleCase()` function needs to take an argument (i.e. `colorName`).
2. We will replace the hyphens with spaces: `const colorWithSpaces = colorName.replaceAll("-", " ");`.
3. Change the beginning letter of each word to a capitalized letter. We will pass in a regex to this with _out of word boundary_ (`/\b`), a _lowercase letter_ (`([a-z])`) in parenthesis so we can catch the lowercase letter, _find them all_ (`/g`), and replace with whatever the `match` was _to uppercase_ (`match.toUpperCase()`).
4. Then we will return the result (`colorWithCaps`).

**_For example_**:

```jsx
// file: ./src/helpers.js

export function kebabCaseToTitleCase(colorName) {
  const colorWithSpaces = colorName.replaceAll("-", " ");
  const colorWithCaps = colorWithSpaces.replace(/\b([a-z])/g, (match) =>
    match.toUpperCase()
  );

  return colorWithCaps;
}
```

Now all of the **unit tests** will be passing.

### Module: Code Quiz Colors with Spaces

#### Tests 2

- Check that color starts with `mediumvioletred` and changes to `midnightblue`.
- Update existing tests.
- After updating the class names in the `toHaveClass` _assertions_ the checkbox disabling tests should still pass (free regression testing / free testing when code changes).

#### Code Quiz Solution 2

> [!NOTE]
> We do not have to change any of the `name` options because they are not very specific (Had keyword and case insensitive).

1. **_Button Click Flow_**: Update the `toHaveClass` to the new color class names for before and after click (i.e. `expect(buttonElement).toHaveClass("medium-violet-red");`).
2. **_Checkbox Flow_**: Update the `toHaveClass` to the new color class names for checkbox click to re-enable button.
3. **_Checkbox Flow After Button Clicked_**: Update the `toHaveClass` to the new color class names for checkbox click to re-enable button.

`App.jsx`

1. Create new constant for next color and title case and assign it to kebab case helper function with `nextColor` passed in as an _argument_. This applies the helper function to whatever the next color is.
2. Update the `nextColor` constant name to `nextColorClass`.
3. For the button text content change `{nextColor}` to `{nextColorTitleCase}`.

### Module: When to Unit Test

- If the logic is complex and difficult to test via functional tests.
- If there are too many _edge cases_.
- When determining what caused a functional test to fail.
- Functional tests are high level which makes them resistant to refactored code, which is good, except when you are trying to diagnose when a test fails.

### Module: Recap Color Button Checkbox App

- Test interactivity from `fireEvent`, an object imported from RTL that has methods on it like `click`.
- Used several new **jest-DOM** _assertions_:
  - `toBeEnabled()`
  - `toBeDisabled()`
  - `toBeChecked()` (Note: We used `.not.toBeChecked()` for the opposite)
- We used the `name` **option** for `getByRole` to identify which checkbox and which button we were referring to.
- We used the `describe` global from Vitest to group tests into logical groups.
- Discussed _unit testing_ functions, demoed, and talked about when to use them.
