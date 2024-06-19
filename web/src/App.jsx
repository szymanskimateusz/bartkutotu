import { useState, useEffect } from "react";
import "./App.css";
import FormComp from "./components/FormComp";
import FormCompUpdate from "./components/FormCompUpdate";
import Activity from "./components/Activity";

function App() {
  const [activities, setActivities] = useState([]);
  const [showUpdate, setShowUpdate] = useState(true);

  const addActivity = (newActivity) => {
    setActivities([...activities, newActivity]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5149/Activity", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        } else {
          console.log("Error fetching activities");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const activityElements = activities.map((activity) => {
    return (
      <Activity
        key={activity.id}
        id={activity.id}
        title={activity.title}
        description={activity.description}
        dueDate={activity.dueDate}
        priority={activity.priority}
      />
    );
  });

  return (
    <>
      <FormComp activities={activities} addActivity={addActivity} />
      <div className="container">
        <h1>Activities</h1>
        <div className="wrapper">{activityElements}</div>
      </div>
    </>
  );
}

export default App;
