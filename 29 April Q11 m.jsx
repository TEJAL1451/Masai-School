import React from 'react';

function App() {
  return (
    <div className="app-container">
      <style>{`
        /* General layout styles */
        .app-container {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        header, nav, main, footer {
          padding: 20px;
          text-align: center;
        }

        header {
          background-color: #4CAF50;
          color: white;
        }

        .navbar {
          background-color: #333;
        }

        .navbar ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
        }

        .navbar ul li {
          margin: 0 15px;
        }

        .navbar ul li a {
          color: white;
          text-decoration: none;
          font-size: 18px;
        }

        .navbar ul li a:hover {
          text-decoration: underline;
        }

        .main-content {
          background-color: #f4f4f4;
          flex-grow: 1;
        }

        footer {
          background-color: #333;
          color: white;
        }
      `}</style>

      <header className="header">
        <h1>Welcome to My Website</h1>
      </header>

      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <h2>Welcome to the main content area!</h2>
        <p>This is a simple webpage layout created using React and Vite.</p>
      </main>

      <footer className="footer">
        <p>&copy; 2025 My Website</p>
      </footer>
    </div>
  );
}

export default App;
