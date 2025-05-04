import React, { useState, useRef } from "react";

function Timer() {
  const [time, setTime] = useState(10);
  const intervalId = useRef(null);

  const startTimer = () => {
    if (intervalId.current === null) {
      intervalId.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalId.current); 
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const resetTimer = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setTime(10);
  };

  return (
    <div>
      <h1>Time Left: {time}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
