import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ClaimApplication from "./Components/ClaimApplication/ClaimApplication";
import Dashboard from "./Components/Dashboard/Dashboard";
import HomePage from "./Components/HomePage/HomePage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ProfilePage from "./Components/Profile/ProfilePage";
import SettingsPage from "./Components/Profile/SettingsPage";
import SingleProfilePage from "./Components/Profile/SingleProfilePage";
import Page404 from "./Components/StaticPages/Page404";
import Layout from "./Layouts/Layout";

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Main layout routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="application"
            element={
              // <PrivateRoute>
              <ClaimApplication />
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

        <Route path="/*" element={<Page404 />} />
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
