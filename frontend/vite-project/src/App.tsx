import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/auth/Login";
import Register from "../src/auth/Register";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
