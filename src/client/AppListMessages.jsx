import React, { useState, useEffect } from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";

export function AppListMessages({ messageApi }) {
  const [messages, setMessages] = useState();
  const [error, setError] = useState();

  async function loadMessages() {
    try {
      /*
            const res = await fetch("/api/messages");
            if (!res.ok) {
                throw new Error(`Something went wrong loading`);// ${res.url}: ${res.statusText}`);
            }

            const json = await res.json();
            setMessages(json);
*/
      setMessages(await messageApi.listMessages());
    } catch (e) {
      setError(e);
    }
  }

  useEffect(loadMessages, []);

  if (error) {
    return <div>Something went wrong: {error.toString()}</div>;
  }
  if (!messages) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>List messages</h1>
      {messages.map(({ id, subject }) => (
        <li key={id}>
          <Link to={`/edit?id=${id}`}>{subject}</Link>
        </li>
      ))}
    </>
  );
}
