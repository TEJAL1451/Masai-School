import React, { useRef } from "react";

function OTPInput() {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    if (e.target.value) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div>
      <h1>OTP Input</h1>
      <div>
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            type="text"
            maxLength="1"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
          />
        ))}
      </div>
    </div>
  );
}

export default OTPInput;
