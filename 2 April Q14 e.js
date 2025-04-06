// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fetch data from Firebase Realtime Database
function fetchUsers() {
    const usersRef = database.ref("users");
    usersRef.once("value")
        .then(snapshot => {
            const users = snapshot.val();
            if (users) {
                displayUsers(users);
            } else {
                document.getElementById("errorMessage").textContent = "No users found.";
            }
        })
        .catch(error => {
            document.getElementById("errorMessage").textContent = "Error fetching data: " + error.message;
        });
}

// Display users in a table
function displayUsers(users) {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    Object.entries(users).forEach(([id, user]) => {
        let row = `<tr id="row-${id}">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser('${id}', '${user.name}', '${user.email}')">Edit</button>
                <button onclick="deleteUser('${id}')">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Add new user to Firebase
function addUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    
    if (name === "" || email === "") {
        document.getElementById("message").textContent = "Please enter both name and email.";
        return;
    }
    
    const newUserRef = database.ref("users").push();
    newUserRef.set({ name, email })
        .then(() => {
            document.getElementById("message").textContent = "User added successfully!";
            document.getElementById("userForm").reset();
            fetchUsers();
        })
        .catch(error => {
            document.getElementById("message").textContent = "Error adding user: " + error.message;
        });
}

// Edit user function
function editUser(userId, userName, userEmail) {
    document.getElementById("editUserId").value = userId;
    document.getElementById("editName").value = userName;
    document.getElementById("editEmail").value = userEmail;
    document.getElementById("editFormContainer").style.display = "block";
}

// Update user information
function updateUser(event) {
    event.preventDefault();
    const userId = document.getElementById("editUserId").value;
    const name = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value;
    
    if (name === "" || email === "") {
        document.getElementById("editMessage").textContent = "Please enter both name and email.";
        return;
    }
    
    database.ref(`users/${userId}`).update({ name, email })
        .then(() => {
            document.getElementById("editMessage").textContent = "User updated successfully!";
            document.getElementById("editForm").reset();
            document.getElementById("editFormContainer").style.display = "none";
            fetchUsers();
        })
        .catch(error => {
            document.getElementById("editMessage").textContent = "Error updating user: " + error.message;
        });
}

// Delete user from Firebase
function deleteUser(userId) {
    database.ref(`users/${userId}`).remove()
        .then(() => {
            console.log("User deleted successfully");
            document.getElementById(`row-${userId}`).remove();
        })
        .catch(error => console.error("Error deleting user:", error));
}

// Fetch users on page load
window.onload = fetchUsers;
