import React, { useState, useEffect } from 'react';

function ToggleComponent() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('Component Mounted');
    return () => {
      console.log('Component Unmounted');
    };
  }, []);

  return (
    <div>
      {isVisible && <div>Component is visible</div>}
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Component Visibility
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>React Mount and Unmount Example</h1>
      <ToggleComponent />
    </div>
  );
}

export default App;
