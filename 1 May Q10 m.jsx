import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function Users() {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetails() {
  const { userId } = useParams();
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  const user = users.find(u => u.id === parseInt(userId));

  return (
    <div>
      <h2>Details of {user ? user.name : 'User not found'}</h2>
      {user ? (
        <p>User ID: {user.id}</p>
      ) : (
        <p>User not found!</p>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>
      </nav>

      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to the App</h2>} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
