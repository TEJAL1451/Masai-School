import React, { useState } from 'react';

function ToggleMessage() {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  function toggleMessage() {
    setIsMessageVisible(!isMessageVisible);
  }

  return (
    <div>
      <button onClick={toggleMessage}>
        {isMessageVisible ? 'Hide' : 'Show'}
      </button>
      {isMessageVisible && <p>Hello, welcome to React state management!</p>}
    </div>
  );
}

export default ToggleMessage;
