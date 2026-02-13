import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import "./App.css";

export default function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/admin" className="nav-link">
          Admin
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}