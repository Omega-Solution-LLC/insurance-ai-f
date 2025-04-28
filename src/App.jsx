import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ClaimWizard from "./Components/ClaimWizard/ClaimWizard";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import HomePage from "./Components/HomePage/HomePage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ProfilePage from "./Components/Profile/ProfilePage";
import SettingsPage from "./Components/Profile/SettingsPage";
import SingleProfilePage from "./Components/Profile/SingleProfilePage.jsx";
import Layout from "./Layouts/Layout.jsx";

// Authentication redirect component
const AuthRedirect = () => {
  const isLogged = localStorage.getItem("isLogged");
  return isLogged ? <Navigate to="/dashboard" replace /> : <HomePage />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Index route that redirects to dashboard if logged in, or shows HomePage if not */}
          <Route index element={<AuthRedirect />} />

          {/* Nested routes will render inside the Layout's Outlet */}
          <Route
            path="/wizard"
            element={
              // <PrivateRoute>
              //   <ClaimWizard />
              // </PrivateRoute>
              <ClaimWizard />
            }
          />
          <Route
            path="profile"
            element={
              // <ProfilePage />
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile/:id"
            element={
              // <SingleProfilePage />
              <PrivateRoute>
                <SingleProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="settings"
            element={
              <SettingsPage />
              // <PrivateRoute>
              //   <SettingsPage />
              // </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* These routes don't use the main layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
