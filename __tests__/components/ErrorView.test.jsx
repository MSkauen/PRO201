import { ErrorView } from "../../src/client/components/ErrorView";
import TestRenderer from "react-test-renderer";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

describe("error view", () => {
  it("show error view on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ErrorView error={401} />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: 401"
    );
  });

  it("show error view on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ErrorView error={404} />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: 404"
    );
  });

  it("show error view on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ErrorView error={500} />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "Something went wrong: 500"
    );
  });
});
