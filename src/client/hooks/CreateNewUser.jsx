import React, { useState } from "react";
import { InputField } from "../components/InputField";
import "../css/stylesheet.css";

export function CreateNewUser({ messapeApi }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  async function submit(e) {
    e.preventDefault();
    console.log("Submitting", { firstName, lastName, email });
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>Create a new user</h1>
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
