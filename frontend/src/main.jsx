import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import ActivityPage from "./pages/activity/ActivityPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
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
        element: <ProtectedRoute />, 
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "profile", element: <ProfilePage /> },
              { path: "activities", element: <ActivityPage /> },
            ],
          },
        ],
      },

      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
