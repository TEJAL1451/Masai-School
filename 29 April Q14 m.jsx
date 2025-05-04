import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('tasks')
      .onSnapshot(snapshot => {
        const taskList = snapshot.docs.map(doc => doc.data());
        setTasks(taskList); 
      });

    
    return () => unsubscribe();
  }, []); 

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
