import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCompletion, setFilterCompletion] = useState('All');

  // Add a new task
  const addTask = () => {
    if (!taskTitle.trim()) {
      alert('Please enter a task title!');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: taskPriority,
      completed: false,
    };

    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      return sortTasks(updatedTasks);
    });

    setTaskTitle('');
    setTaskPriority('Medium');
  };

  // Sort tasks based on priority
  const sortTasks = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Filter tasks based on priority and completion status
  const filteredTasks = tasks.filter((task) => {
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    const completionMatch =
      filterCompletion === 'All' ||
      (filterCompletion === 'Completed' && task.completed) ||
      (filterCompletion === 'Incomplete' && !task.completed);

    return priorityMatch && completionMatch;
  });

  return (
    <div>
      <h1>Advanced Task Manager</h1>

      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div>
        <label>
          Filter by Priority:
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          Filter by Completion Status:
          <select
            value={filterCompletion}
            onChange={(e) => setFilterCompletion(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </label>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              backgroundColor: task.priority === 'High' ? '#ffdddd' : 'transparent',
            }}
          >
            <strong>{task.title}</strong> - {task.priority} priority
            <button onClick={() => toggleCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
