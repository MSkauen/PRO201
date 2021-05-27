import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { BrowserRouter, Link } from "react-router-dom";
import {useParams} from "react-router";
import {LogPage} from "./LogPage";


export function AppListItems({item}) {

  return (
    <>

      <h1>PARTS ${item.partsChanged } REPLACED FOR ${item.id}</h1>
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

    </>
  );
}
export function GetItem({ itemApi }) {
    const { id } = useParams()
    const { data: item, loading, error, reload } = useLoading(
        async () => await itemApi.getItem(id),
        [id]
    );
    if (error) {
        return <ErrorView error={error} reload={reload()} />;
    }

    if (loading || !item) {
        return <LoadingView />;
    }

    return <AppListItems item={item} />;
}

//      {messages.map(({ id, sender, subject }) => (
//         <li key={id}>
//           <Link to={`/messages/${id}/edit`}>
//             <b>{sender}</b> [Subject:{subject}]
//           </Link>
//         </li>
//       ))}