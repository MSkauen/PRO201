import TestRenderer from "react-test-renderer";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { AppListMessages } from "../src/client/hooks/AppListMessages";

const messageApi = {
  listMessages: async () => [{ id: 1, subject: "nyMelding" }],
};

describe("message list page", () => {
  it("show messages", async () => {
    let view;
    await TestRenderer.act(async () => {
      view = TestRenderer.create(<AppListMessages messageApi={messageApi} />);
    });
    expect(view.toJSON()).toMatchSnapshot();
    expect(view.root.findByType("li").children[0]).isContaining("nyMelding");
  });

  it("show messages on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(<AppListMessages messageApi={messageApi} />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual("nyMelding");
  });
});
