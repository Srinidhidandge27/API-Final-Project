import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LogSymptomPage from './pages/LogSymptomPage';
import SymptomHistoryPage from './pages/SymptomHistoryPage';
import SymptomDetailsPage from './pages/SymptomDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage'; // Add this import

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <Sidebar authenticated={authenticated} onLogout={handleLogout} />
        <div className="flex-1 bg-gray-100 p-8 overflow-auto">
          <Routes>
            <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
            <Route path="/signup" element={<SignupPage setAuthenticated={setAuthenticated} />} />
            <Route path="/" element={authenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/log-symptom" element={authenticated ? <LogSymptomPage /> : <Navigate to="/login" />} />
            <Route path="/symptom-history" element={authenticated ? <SymptomHistoryPage /> : <Navigate to="/login" />} />
            <Route path="/symptom/:id" element={authenticated ? <SymptomDetailsPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={authenticated ? <ProfilePage /> : <Navigate to="/login" />} /> {/* Add Profile Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
