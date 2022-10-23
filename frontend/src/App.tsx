import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import UserCreate from "./components/UserCreate";
//import Signin from "./components/Signin";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Users />} />
          <Route path="/create" element={<UserCreate />} />
        </Routes>
      </div>
    </Router>
  );
}
