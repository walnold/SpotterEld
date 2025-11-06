import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    if (email === "admin@mail.com" && password === "123456") {
      login(email); 
      navigate("/dashboard", { replace: true });
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <h2>Welcome Back 👋</h2>
          <p>Login to access your dashboard</p>
          <input
            type="email"
            name="email"
            placeholder="email@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login 🔒</button>
          <p className="signup-text">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="signup-link">
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
