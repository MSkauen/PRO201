import { EditMessageForm } from "../../src/client/hooks/EditResponse";

import * as ReactDOM from "react-dom";
import * as React from "react";

const messageApi = {
  listMessages: async () => [
    {
      id: 1,
      subject: "Hello world",
      recipient: "admin",
      content: "Hello test",
    },
  ],
};

describe("Loading view", () => {
  it("can respond to message"),
    async () => {
      const container = document.createElement("div");
      ReactDOM.render(<EditMessageForm message={messageApi} />, container);
      expect(container.innerHTML).toMatchSnapshot();
    };
});
