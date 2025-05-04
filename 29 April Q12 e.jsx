import React, { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Focus Management Example</h1>
      <FocusInput />
    </div>
  );
}

export default App;
