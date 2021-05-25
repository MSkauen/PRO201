import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { BrowserRouter, Link } from "react-router-dom";

export function AppListItems({ itemApi }) {
  const { data: items, error, loading, reload } = useLoading(
    async () => await itemApi.listItems()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !messages) {
    return <LoadingView />;
  }

  return (
    <>

      <h1>PARTS REPLACED</h1>
      <div className="partsReplacedContainer">
      </div>

      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>

      <h1>SUCCESS!</h1>
      <h2 className="timerTag"></h2>

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
