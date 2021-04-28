import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { BrowserRouter, Link } from "react-router-dom";

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
      <h1>List messages</h1>
      {messages.map(({ id, sender, subject }) => (
        <li key={id}>
          <Link to={`/messages/${id}/edit`}>
            <b>{sender}</b> [Subject:{subject}]
          </Link>
        </li>
      ))}
    </>
  );
}
