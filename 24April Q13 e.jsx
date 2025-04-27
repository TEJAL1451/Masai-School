import React, { useState } from 'react';

function DynamicEmailForm() {
  const [emails, setEmails] = useState([{ email: '', error: '' }]);

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index].email = value;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    newEmails[index].error = emailRegex.test(value) ? '' : 'Invalid email format';

    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { email: '', error: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmails = emails.filter((emailObj) => !emailObj.error && emailObj.email);

    if (validEmails.length === emails.length) {
      alert('Submitted Emails: ' + validEmails.map((emailObj) => emailObj.email).join(', '));
    } else {
      alert('Please correct invalid emails.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {emails.map((emailObj, index) => (
          <div key={index}>
            <input
              type="email"
              value={emailObj.email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="Enter email"
            />
            {emailObj.error && <span style={{ color: 'red' }}>{emailObj.error}</span>}
          </div>
        ))}
        <button type="button" onClick={handleAddEmail}>Add Email</button>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Entered Emails:</h3>
        <ul>
          {emails.map((emailObj, index) => (
            <li key={index}>{emailObj.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DynamicEmailForm;
