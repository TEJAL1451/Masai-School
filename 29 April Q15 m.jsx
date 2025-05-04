import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskCategory, setTaskCategory] = useState("not-started"); 

  
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  
  const addTask = async () => {
    if (newTask) {
      await addDoc(collection(db, "tasks"), {
        name: newTask,
        category: taskCategory
      });
      setNewTask("");
      setTaskCategory("not-started"); 
    }
  };

 
  const updateTaskCategory = async (taskId, newCategory) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { category: newCategory });
  };


  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
  };

  
  useEffect(() => {
    fetchTasks();
  }, []); 

 
  const filteredTasks = (category) => tasks.filter(task => task.category === category);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Task Management Application</h1>
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div>
          <h3>Completed ({filteredTasks("completed").length})</h3>
          <ul>
            {filteredTasks("completed").map(task => (
              <li key={task.id} onMouseOver={() => console.log(task.name)}>{task.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Ongoing ({filteredTasks("ongoing").length})</h3>
          <ul>
            {filteredTasks("ongoing").map(task => (
              <li key={task.id} onMouseOver={() => console.log(task.name)}>{task.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Not Started ({filteredTasks("not-started").length})</h3>
          <ul>
            {filteredTasks("not-started").map(task => (
              <li key={task.id} onMouseOver={() => console.log(task.name)}>{task.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Task Input and Add Button */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} style={{ padding: '10px' }}>
          <option value="not-started">Not Started</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={addTask} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Add Task
        </button>
      </div>

      {/* Displaying Tasks */}
      <h2>All Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <span>{task.name} ({task.category})</span>
            <button onClick={() => updateTaskCategory(task.id, "completed")} style={{ marginLeft: '10px' }}>
              Mark Completed
            </button>
            <button onClick={() => updateTaskCategory(task.id, "ongoing")} style={{ marginLeft: '10px' }}>
              Mark Ongoing
            </button>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
