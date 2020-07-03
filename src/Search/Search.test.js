import React from "react";
import { Simulate } from "react-dom/test-utils";
//import { shallow, render } from 'enzyme';
import ReactDOM from "react-dom";
import Search from "./Search";

let testContainer = null;
beforeEach(() => {
  testContainer = document.createElement("div");
  document.body.appendChild(testContainer);
  ReactDOM.render(<Search />, testContainer);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(testContainer);
  testContainer.remove();
  testContainer = null;
});

describe("Form control exist and clears the user input", () => {
  let clearButton = null;
  beforeEach(() => {
    clearButton = testContainer.querySelector(".search-form__button--clear");
  });

  it("clear button exist", () => {
    expect(clearButton).not.toBe(null);
  });

  it("clear button should clear the input field", () => {
    const FormInput = testContainer.querySelector(".search-form__input");
    expect(FormInput).not.toBe(null);

    FormInput.value = "test";

    Simulate.click(clearButton);
    setTimeout(() => {
      expect(FormInput.value).toBe("");
    }, 0);
  });
});
