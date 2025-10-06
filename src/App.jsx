import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import WebHooksPage from "./pages/WebHooksPage";
import ErrorLogsPage from "./pages/ErrorLogsPage";
import FIPage from "./pages/FIPage";
import LogPage from "./pages/LogPage";

function App() {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-semibold ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow p-4 flex gap-4">
          <NavLink to="/applications" className={navLinkClass}>
            Applications
          </NavLink>
          <NavLink to="/web-hooks" className={navLinkClass}>
            Web Hooks
          </NavLink>
          <NavLink to="/error-logs" className={navLinkClass}>
            Error Logs
          </NavLink>
          <NavLink to="/logs" className={navLinkClass}>
            Logs
          </NavLink>
          <NavLink to="/fi" className={navLinkClass}>
            FI
          </NavLink>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/web-hooks" element={<WebHooksPage />} />
          <Route path="/error-logs" element={<ErrorLogsPage />} />
          <Route path="/logs" element={<LogPage />} />
          <Route path="/fi" element={<FIPage />} />
          <Route path="*" element={<LogPage />} /> {/* default */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
