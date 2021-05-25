import TestRenderer from "react-test-renderer";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { AppListItems } from "../src/client/hooks/AppListItems";
import { MemoryRouter } from "react-router";

const messageApi = {
  listMessages: async () => [{ id: 1, subject: "Hello world", sender: "Ola" }],
};

describe("message list page", () => {
  it("show message sender on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <AppListItems messageApi={messageApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toContain("Ola");
  });

  it("show message content on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <AppListItems messageApi={messageApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toContain("Hello world");
  });
});
