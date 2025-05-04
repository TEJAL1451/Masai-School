import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function Home() {
  return <h2>Welcome to the Home Page</h2>;
}

function About() {
  return <h2>Welcome to the About Page</h2>;
}

function Contact() {
  return <h2>Welcome to the Contact Page</h2>;
}

function Services() {
  return <h2>Welcome to the Services Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className="nav-link" 
              activeClassName="active" 
              exact
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className="nav-link" 
              activeClassName="active"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className="nav-link" 
              activeClassName="active"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" 
              className="nav-link" 
              activeClassName="active"
            >
              Services
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
