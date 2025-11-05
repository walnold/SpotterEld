import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./dashboard.css"; // optional: create this for styles

const DashboardLayout = () => {
  return (
    <div
      className="dashboard-root"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      <aside
        className="dashboard-sidebar"
        style={{
          width: 260,
          padding: "1.5rem",
          background: "#0f172a",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Dashboard</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <NavLink
            to=""
            end
            style={({ isActive }) => ({
              color: isActive ? "#1f6feb" : "#fff",
              textDecoration: "none",
            })}
          >
            Overview
          </NavLink>
          <NavLink
            to="profile"
            style={({ isActive }) => ({
              color: isActive ? "#1f6feb" : "#fff",
              textDecoration: "none",
            })}
          >
            Profile
          </NavLink>
          <NavLink
            to="activities"
            style={({ isActive }) => ({
              color: isActive ? "#1f6feb" : "#fff",
              textDecoration: "none",
            })}
          >
            Activities
          </NavLink>
        </nav>
      </aside>

      <main
        className="dashboard-content"
        style={{ flex: 1, padding: "2rem", background: "#f8fafc" }}
      >
        {/* This is where the nested dashboard routes will render */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
