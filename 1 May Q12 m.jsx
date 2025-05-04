import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

function App() {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  function Users() {
    return (
      <div>
        <h1>Users Page</h1>
        {users.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </div>
        ))}
      </div>
    );
  }

  function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
      return (
        <div>
          <h1>User not found</h1>
          <button onClick={() => navigate("/users")}>Back to Users</button>
        </div>
      );
    }

    return (
      <div>
        <h1>User Details for {user.name}</h1>
        <p>User ID: {user.id}</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
