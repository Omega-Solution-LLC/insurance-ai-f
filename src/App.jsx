import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import HomePage from "./Components/HomePage/HomePage";
import ClaimWizard from "./Components/ClaimWizard/ClaimWizard";
import ProfilePage from "./Components/Profile/ProfilePage";
import SingleProfilePage from "./Components/Profile/SingleProfilePage";
import SettingsPage from "./Components/Profile/SettingsPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main layout routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="wizard"
            element={
              // <PrivateRoute>
                <ClaimWizard />
              // </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile/:id"
            element={
              <PrivateRoute>
                <SingleProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              // <PrivateRoute>
                <SettingsPage />
              // </PrivateRoute>
            }
          />
        </Route>

        {/* Routes outside the main layout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;