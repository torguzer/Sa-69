import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Report from "./components/History";
import ScholarCreate from "./components/ScholarCreate";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/ScholarHistory" element={<Report />} />
          <Route path="/ScholarCreate" element={<ScholarCreate />} />
        </Routes>
      </div>
    </Router>
  );
}
