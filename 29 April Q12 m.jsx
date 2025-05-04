import React, { useState, useEffect } from 'react';

function App() {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });

  const fetchJoke = async () => {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    setJoke({ setup: data.setup, punchline: data.punchline });
  };

  
  useEffect(() => {
    fetchJoke();
  }, []); 
  return (
    <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <div className="joke-card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center', width: '300px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2>Random Joke</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{joke.setup}</p>
        <p style={{ fontSize: '16px', color: '#555' }}>{joke.punchline}</p>
        <button 
          onClick={fetchJoke} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          Get Another Joke
        </button>
      </div>
    </div>
  );
}

export default App;
