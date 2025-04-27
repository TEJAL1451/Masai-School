import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchData = () => {
    axios("https://your-firebase-db.firebaseio.com/tasks.json")
      .then((response) => {
        // Parse the Firebase response properly
        const taskData = response.data;
        if (taskData) {
          // Convert the object to an array
          const loadedTasks = Object.keys(taskData).map((key) => ({
            id: key,
            ...taskData[key],
          }));
          setTasks(loadedTasks);
        }
      })
      .catch((error) => {
        console.log("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} {/* Ensure 'task.name' exists */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
