import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { Link } from "react-router-dom";

export function AppListUsers({ userApi }) {
  const { data: users, error, loading, reload } = useLoading(
    async () => await userApi.listUsers()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !users) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>List users</h1>
      {users.map(({ id, firstName }) => (
        <li key={id}>
          <Link to={`/users/${id}/edit`}>{firstName}</Link>
        </li>
      ))}
    </>
  );
}
