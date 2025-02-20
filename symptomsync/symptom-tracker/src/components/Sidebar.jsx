import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ authenticated, onLogout }) {
    return (
        <header className="bg-black text-white flex items-center justify-between p-4 w-full">
            <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">Symptom Tracker</span>
            </div>
            <nav className="flex space-x-6">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                {authenticated && (
                    <>
                        <Link to="/log-symptom" className="hover:text-gray-300">Log Symptom</Link>
                        <Link to="/symptom-history" className="hover:text-gray-300">Symptom History</Link>
                        <Link to="/profile" className="hover:text-gray-300">Profile</Link> {/* Add Profile Link */}
                        <Link onClick={onLogout} className="hover:text-gray-300">Logout</Link>
                    </>
                )}
                {!authenticated && (
                    <>
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                        <Link to="/signup" className="hover:text-gray-300">Signup</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Sidebar;
