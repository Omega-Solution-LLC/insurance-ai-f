import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import ClaimWizard from "./Components/ClaimWizard/ClaimWizard";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wizard" element={<ClaimWizard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
