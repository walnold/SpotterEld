// src/App.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* Simple Navbar Example */}
      <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/dashboard" style={{ marginRight: "1rem" }}>
          Dashboard
        </Link>
        <Link to="/login" style={{ marginRight: "1rem" }}>
          Login
        </Link>
        <Link to="/signup">Signup</Link>
      </nav>

      {/* Nested routes will render here */}
      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
