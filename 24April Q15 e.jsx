import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagementSystem() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState({ id: '', name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch users from Firebase
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://your-firebase-db.firebaseio.com/users.json');
      const fetchedUsers = [];
      for (let key in response.data) {
        fetchedUsers.push({ id: key, ...response.data[key] });
      }
      setUsers(fetchedUsers);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const addUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !/\S+@\S+\.\S+/.test(newUser.email)) {
      setError('Please fill in both name and a valid email');
      return;
    }

    try {
      await axios.post('https://your-firebase-db.firebaseio.com/users.json', {
        name: newUser.name,
        email: newUser.email,
      });
      setNewUser({ name: '', email: '' });
      fetchUsers(); // Refresh users list
      setError('');
    } catch (error) {
      setError('Error adding user');
    }
  };

  // Edit a user's information
  const editUserHandler = (id) => {
    const user = users.find((u) => u.id === id);
    setEditUser({ ...user });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (!editUser.name || !editUser.email || !/\S+@\S+\.\S+/.test(editUser.email)) {
      setError('Please fill in both name and a valid email');
      return;
    }

    try {
      await axios.patch(`https://your-firebase-db.firebaseio.com/users/${editUser.id}.json`, {
        name: editUser.name,
        email: editUser.email,
      });
      setEditUser({ id: '', name: '', email: '' });
      fetchUsers(); // Refresh users list
      setError('');
    } catch (error) {
      setError('Error updating user');
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://your-firebase-db.firebaseio.com/users/${id}.json`);
      fetchUsers(); // Refresh users list
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>User Management System</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Add User</h2>
        <form onSubmit={addUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      <div>
        <h2>Edit User</h2>
        {editUser.id && (
          <form onSubmit={saveUser}>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />
            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>

      <div>
        <h2>Users List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span>{user.name} ({user.email})</span>
                <button onClick={() => editUserHandler(user.id)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserManagementSystem;
