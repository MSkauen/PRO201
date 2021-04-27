import React from "react";
import { LoadingView } from "../components/LoadingView";
import { BrowserRouter, Link } from "react-router-dom";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";

export function AppListMessages({ messageApi }) {
  const { data: messages, error, loading, reload } = useLoading(
    async () => await messageApi.listMessages()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !messages) {
    return <LoadingView />;
  }

  return (
    <>
      <BrowserRouter>
        <h1>List messages</h1>
        {messages.map(({ id, subject }) => (
          <li key={id}>
            <nav>
              <Link to={`/messages/${id}/edit`}>{subject}</Link>
            </nav>
          </li>
        ))}
      </BrowserRouter>
    </>
  );
}
