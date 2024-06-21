import { getTodayDate } from "../../functions/getTodayDate";
import { useState } from "react";

export default function FormCompUpdate(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const [priority, setPriority] = useState(props.priority);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5149/Activity/${props.id}", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, dueDate, priority }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Activity updated successfully!");
          setMessage("Updated!");
        } else {
          console.log("Error updating activity");
          setMessage("Ops! Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Ops! Something went wrong!");
      });
  };

  return (
    <>
      <div className="form-comp">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            id="dueDate"
            name="Due Date"
            min={getTodayDate()}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
