import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Page1 from "./Components/ClaimWizard/Page1";
import Page2 from "./Components/ClaimWizard/Page2";
import Page3 from "./Components/ClaimWizard/Page3";
import Page4 from "./Components/ClaimWizard/Page4";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wizard/page1" element={<Page1 />} />
        <Route path="/wizard/page2" element={<Page2 />} />
        <Route path="/wizard/page3" element={<Page3 />} />
        <Route path="/wizard/page4" element={<Page4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
