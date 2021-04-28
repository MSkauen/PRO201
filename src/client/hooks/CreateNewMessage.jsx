import React, { useState } from "react";
import { InputField } from "../components/InputField";
import "../css/stylesheet.css";

export function CreateNewMessage({ messageApi }) {
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/profile", {});
    const json = await res.json();
    let sender = json.username;

    console.log("Submitting", { sender, recipient, subject, content, date });
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ sender, recipient, subject, content, date }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>Create a new message</h1>
      <InputField
        label={"Subject"}
        value={subject}
        onChangeValue={setSubject}
      />
      <InputField
        label={"Recipient"}
        value={recipient}
        onChangeValue={setRecipient}
      />
      <InputField
        label={"Content"}
        value={content}
        onChangeValue={setContent}
      />
      <InputField
        label={"Date"}
        value={date}
        onChangeValue={setDate}
        type="date"
      />
      <button>Submit</button>
    </form>
  );
}
