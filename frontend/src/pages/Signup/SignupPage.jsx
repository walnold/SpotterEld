import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user locally (mock)
    localStorage.setItem("user", JSON.stringify({ name, email, password }));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <p>Join us and access your personalized dashboard.</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Sign Up ✨</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
