import React from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate()


  const handleLogin = () => {
    navigate("/dashboard")
  }
  return (
    <div>
      <div className="container">
        <div className="login-form">
          <form onSubmit={handleLogin}>
          <h1>Login</h1>
            <input type="text" placeholder="email@mail.com" />
            <input type="password" name="password" />

            <button type="submit">Login 🔒</button>
          </form>
        </div>
        <p>
          Dont have an account?{" "}
          <span>
            <NavLink to="/signup">Sign up</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
