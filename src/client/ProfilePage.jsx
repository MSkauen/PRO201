import React from "react";
import { LoadingView } from "./LoadingView";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";
import { fetchJson } from "./http";

export function ProfilePage() {
  const { data, error, loading, reload } = useLoading(() =>
    fetchJson("/api/profile")
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  const { username } = data;

  return (
    <div>
      <h1>Your profile</h1>
      <div>Username: {username}</div>
    </div>
  );
}
