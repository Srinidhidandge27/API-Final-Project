import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Example to store the token after successful login
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        setAuthenticated(true);
        navigate('/'); 
    } else {
        setError(data.message);
    }
};



  return (
    <div className="max-w-sm mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
