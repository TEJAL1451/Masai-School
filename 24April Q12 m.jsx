import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);

  const increaseCounter = () => {
    setCounter(prevCounter => prevCounter + step);
  };

  const decreaseCounter = () => {
    setCounter(prevCounter => Math.max(0, prevCounter - step));
  };

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setStep(value);
    }
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <div>
        <button onClick={increaseCounter}>Increase</button>
        <button onClick={decreaseCounter}>Decrease</button>
      </div>
      <div>
        <label>Step value: </label>
        <input 
          type="number" 
          value={step} 
          onChange={handleStepChange}
          min="1"
        />
      </div>
    </div>
  );
}

export default Counter;
