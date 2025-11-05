import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Import components/pages
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import ActivityPage from "./pages/activity/ActivityPage.jsx";
import LoginPage from "./pages/loginpage/LoginPage.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx"; 

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <Home /> },
      {
        path: "dashboard",
        element: <DashboardLayout />, 
        children: [
          { index: true, element: <Dashboard /> },
          { path: "profile", element: <ProfilePage /> }, 
          { path: "activities", element: <ActivityPage /> }, 
        ],
      },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Render app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
