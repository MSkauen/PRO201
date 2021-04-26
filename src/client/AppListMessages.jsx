import React from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

export function AppListMessages({ messageApi }) {
  const { error, loading, data, reload } = useLoading(async () =>
    messageApi.listMessages()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>List messages</h1>
      {data.map(({ id, subject }) => (
        <li key={id}>
          <Link to={`/edit?id=${id}`}>{subject}</Link>
        </li>
      ))}
    </>
  );
}
