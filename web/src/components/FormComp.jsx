import { getTodayDate } from "../../functions/getTodayDate";
import { useState } from "react";

export default function FormComp({ activities, addActivity }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(getTodayDate());
  const [priority, setPriority] = useState(1);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleAddActivity = () => {
    const newActivity = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    };
    addActivity(newActivity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5149/Activity", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, dueDate, priority }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Activity added successfully!");
          setMessage("Saved!");
          handleAddActivity();
        } else {
          console.log("Error adding activity");
          setMessage("Ops! Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Ops! Something went wrong!");
      });

    setShowMsg(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setTitle("");
    setDescription("");
    setDueDate(getTodayDate());
    setPriority(1);
    setShowMsg(false);
  };

  return (
    <>
      <div className="form-comp">
        {!showMsg ? (
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
        ) : (
          <h2 id="blue">{message}</h2>
        )}
      </div>
    </>
  );
}
