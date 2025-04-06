import React, { useEffect, useState } from "react";

const API_URL = "https://mockapi.io/tasks";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const updatedData = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? updatedData : task)));
      setEditTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTask?.id === task.id ? (
              <>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask({ ...editTask, title: e.target.value })
                  }
                />
                <select
                  value={editTask.status}
                  onChange={(e) =>
                    setEditTask({ ...editTask, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => updateTask(task.id, editTask)}>Save</button>
                <button onClick={() => setEditTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.title} - {task.status}
                <button onClick={() => setEditTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
