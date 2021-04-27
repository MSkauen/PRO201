import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "../components/LoadingView";
import { InputField } from "../components/InputField";
import { ErrorView } from "../components/ErrorView";
import { useLoading } from "../lib/useLoading";

function EditMessageForm({ message }) {
  const [subject, setSubject] = useState(message.subject);
    const [recipient, setRecipient] = useState(message.recipient);
    const [content, setContent] = useState(message.content);
  const [date, setDate] = useState(message.date);

  async function submit(e) {
    e.preventDefault();
    console.log("Submitting", { recipient, subject, content, date });
    await fetch(`/api/messages/${message.id}`, {
      method: "PUT",
      body: JSON.stringify({ recipient, subject, content, date }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit an existing message ({subject})</h1>
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

export function EditMessage({ messageApi }) {
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
