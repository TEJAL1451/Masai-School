import React, { useState, useEffect } from "react";

function StateTracker() {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log(`State updated: ${state}`);
  }, [state]);

  const updateState = () => {
    setState(Math.floor(Math.random() * 100));
  };

  return (
    <div>
      <button onClick={updateState}>Update State</button>
    </div>
  );
}

export default StateTracker;
