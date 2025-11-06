import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import "./Dashboard.css";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close sidebar on link click (only for small screens)
  const handleNavClick = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="dashboard-title">Dashboard</h2>
        </div>

        <nav className="dashboard-nav">
          <NavLink to="" end className="nav-link" onClick={handleNavClick}>
            Overview
          </NavLink>
          <NavLink to="profile" className="nav-link" onClick={handleNavClick}>
            Profile
          </NavLink>
          <NavLink
            to="activities"
            className="nav-link"
            onClick={handleNavClick}
          >
            Activities
          </NavLink>
        </nav>

        {/* Profile & Logout */}
        <div className="sidebar-profile">
          <p className="profile-name">{user?.name || "Guest"}</p>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <h1 className="dashboard-heading">
            Welcome Back, {user?.name || "User"}!
          </h1>
        </header>

        <section className="dashboard-body">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
