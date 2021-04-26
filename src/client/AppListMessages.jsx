import React from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

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
      {messages.map(({ id, subject }) => (
        <li key={id}>
          <Link to={`/messages/${id}/edit`}>{subject}</Link>
        </li>
      ))}
    </>
  );
}
