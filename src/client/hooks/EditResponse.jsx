import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "../components/LoadingView";
import { InputField } from "../components/InputField";
import { ErrorView } from "../components/ErrorView";
import { useLoading } from "../lib/useLoading";
import "../../shared/css/stylesheet.css";

export function EditMessageForm({ message }) {
  const [subject, setSubject] = useState(message.subject);
  const [recipient, setRecipient] = useState(message.sender);
  const [content, setContent] = useState();
  const [date, setDate] = useState(message.date);
  let sender;

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/profile", {});
    const json = await res.json();
    sender = json.username;

    console.log("Submitting", { sender, recipient, subject, content, date });
    await fetch(`/api/messages/`, {
      method: "POST",
      body: JSON.stringify({ sender, recipient, subject, content, date }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>{subject}</h1>
      <p>"{message.content}"</p>
      <InputField
        label={"Recipient"}
        value={recipient}
        onChangeValue={setRecipient}
      />
      <InputField
        label={"Subject"}
        value={subject}
        onChangeValue={setSubject}
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

export function EditResponse({ messageApi }) {
  const { id } = useParams();

  const { data: message, loading, error, reload } = useLoading(
    async () => await messageApi.getMessage(id),
    [id]
  );

  if (error) {
    return <ErrorView error={error} reload={reload()} />;
  }

  if (loading || !message) {
    return <LoadingView />;
  }

  return <EditMessageForm message={message} />;
}
