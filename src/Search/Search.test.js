import React from "react";
import { act, Simulate } from "react-dom/test-utils";
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
  let formInput = null;
  let clearButton = null;
  beforeEach(() => {
    formInput = testContainer.querySelector(".search-form__input");
    formInput.value = "test";
  });

  it("form input exist", () => {
    expect(formInput).not.toBe(null);
    expect(formInput.value).toBe("test");
  });

  it("clear button exist", () => {});

  it("clear button should clear the input field", () => {});
});
