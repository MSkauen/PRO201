import { EditMessageForm } from "../../src/client/hooks/EditResponse";

import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";

const message = {
  listMessages: async () => [
    {
      id: 1,
      subject: "Stuff",
      recipient: "admin",
      content: "Hello test",
      date: "",
    },
  ],
};

describe("Response view", () => {
  it("show response subject on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <EditMessageForm message={message} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("input").textContent).toEqual("");
  });
});
