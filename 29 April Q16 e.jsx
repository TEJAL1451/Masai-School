import React, { useRef, useEffect } from "react";

function ClickCounter() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current += 1;
    console.log(`Button clicked ${countRef.current} times`);
  };

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default ClickCounter;
