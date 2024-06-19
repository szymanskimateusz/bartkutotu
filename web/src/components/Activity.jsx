import { useState } from "react";
import FormCompUpdate from "./FormCompUpdate";

export default function Activity(props) {
  const [showUpdate, setShowUpdate] = useState(true);

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5149/Activity/${props.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Activity with id ${props.id} deleted successfully.`);
        } else {
          console.log("Error deleting activity");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="activity">
      {showUpdate && (
        <div className="left">
          <h2 className="title">{props.title}</h2>
          <h5 className="description">{props.description}</h5>
          <h6 className="dueDate">{props.dueDate}</h6>
          <h4 className="priority">{props.priority}</h4>
        </div>
      )}
      {!showUpdate && (
        <div className="left">
          <FormCompUpdate
            key={props.id}
            id={props.id}
            title={props.title}
            description={props.description}
            dueDate={props.dueDate}
            priority={props.priority}
          />
        </div>
      )}
      <div className="right">
        <button id="blue" onClick={() => setShowUpdate(!showUpdate)}>
          {showUpdate ? "Update" : "Cancel"}
        </button>
        <button id="danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
