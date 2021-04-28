import { InputField } from "../../src/client/components/InputField";
import TestRenderer from "react-test-renderer";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
//export function InputField({ label, onChangeValue, value, type }) {
describe("inputfield", () => {
  it("show input field label on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<InputField label={"test"} />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("label").textContent).toEqual("test: ");
  });

  it("show input field onChangeValue on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<InputField value={"inputvalue"} />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("input").value).toEqual("inputvalue");
  });

  it("show input field type on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<InputField type={"date"} />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").innerHTML).toContain("date");
  });
});
