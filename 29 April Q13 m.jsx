import React, { useState, useEffect } from 'react';

function App() {
  const [counter, setCounter] = useState(0);

  
  useEffect(() => {
    console.log('Counter value:', counter);
  }, [counter]);

  
  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  return (
    <div className="counter-app" style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {counter}</h1>
      <div>
        <button 
          onClick={increment} 
          style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Increment
        </button>
        <button 
          onClick={decrement} 
          style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Decrement
        </button>
        <button 
          onClick={reset} 
          style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
