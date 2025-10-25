import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>Book Review App (UI)</h1>
          <nav>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            {/* Always show signup first at the root */}
            <Route path="/" element={<Navigate to="/signup" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;