import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    // Example logic — replace with real API call or authentication logic
    if (email === "admin@mail.com" && password === "123456") {
      // Store login status (optional)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="text"
            name="email"
            placeholder="email@mail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login 🔒</button>
        </form>
      </div>
      <p>
        Don’t have an account?{" "}
        <span>
          <NavLink to="/signup">Sign up</NavLink>
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
