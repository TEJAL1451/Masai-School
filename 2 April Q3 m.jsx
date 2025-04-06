import React, { useEffect, useState } from "react";

const API_URL = "https://mockapi.io/users";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    if (users.some((user) => user.email === email)) {
      setError("User with this email already exists");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) throw new Error("Failed to add user");
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
