import TestRenderer from "react-test-renderer";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { AppListItems } from "../src/client/hooks/AppListItems";
import { MemoryRouter } from "react-router";
import { AppListCourses } from "../src/client/hooks/AppListCourses";

const userApi = {
  listUsers: async () => [
    { id: 1, firstName: "Ola", lastName: "Nordmann", email: "epost@gmail.com" },
  ],
};

describe("user list page", () => {
  it("show user first name on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <AppListCourses userApi={userApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual("Ola Nordmann");
  });
});
