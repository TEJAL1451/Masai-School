import React, { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Alert the entered text
    alert(`Submitted Text: ${inputRef.current.value}`);

    // Clear the input field
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Text Input: </label>
        <input
          type="text"
          ref={inputRef}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
