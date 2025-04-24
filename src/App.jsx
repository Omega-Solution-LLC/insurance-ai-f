import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ClaimWizard from "./Components/ClaimWizard/ClaimWizard";
import HomePage from "./Components/HomePage/HomePage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/wizard"
          element={
            <PrivateRoute>
              <ClaimWizard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
