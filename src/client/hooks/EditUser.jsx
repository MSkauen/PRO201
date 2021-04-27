import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "../components/LoadingView";
import { InputField } from "../components/InputField";
import { ErrorView } from "../components/ErrorView";
import { useLoading } from "../lib/useLoading";

function EditUserForm({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  async function submit(e) {
    e.preventDefault();
    console.log("Submitting", { firstName, lastName, email });
    await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ firstName, lastName, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit an existing user ({firstName}) </h1>
      <InputField
        label={"First name"}
        value={firstName}
        onChangeValue={setFirstName}
      />
      <InputField
        label={"Last name"}
        value={lastName}
        onChangeValue={setLastName}
      />
      <InputField label={"Email"} value={email} onChangeValue={setEmail} />
      <button>Submit</button>
    </form>
  );
}

export function EditUser({ userApi }) {
  const { id } = useParams();

  const { data: user, loading, error, reload } = useLoading(
    async () => await userApi.getUser(id),
    [id]
  );

  if (error) {
    return <ErrorView error={error} reload={reload()} />;
  }

  if (loading || !user) {
    return <LoadingView />;
  }

  return <EditUserForm user={user} />;
}
