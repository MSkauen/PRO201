import React from "react";

export function ErrorView({ error, reload }) {
  if (error.status === 401) {
    return (
      <div id="errorView">
        <a href={"/login"} target={"_self"}>
          <button>Log in</button>
        </a>
      </div>
    );
  }
  return (
    <>
      <div>Something went wrong: {error.toString()}</div>
      {reload && <button onClick={reload}>Try Again</button>}
    </>
  );
}
