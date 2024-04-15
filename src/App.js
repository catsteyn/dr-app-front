import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ClientPage from "./components/ClientPage";
import AdminPage from "./components/AdminPage";
import "./App.css";

function App() {
  return (
    // Set up React Router for navigation
    <Router>
      {/* Define routes for different pages */}
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<LoginPage />} />
        {/* Route for the client page */}
        <Route path="/client" element={<ClientPage />} />
        {/* Route for the admin page */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
