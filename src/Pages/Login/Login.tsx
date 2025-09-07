import React, { useState, useEffect } from 'react';
import { FaLeaf, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 🔍 Check login status on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Optional: redirect if already logged in
    if (loggedIn) {
      navigate('/payment'); // or any other page like "/dashboard"
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      alert(res.data.message);

      // ✅ Save login flag and optionally JWT
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', res.data.token); // if you receive token

      setIsLoggedIn(true);
      navigate('/payment'); // redirect to payment or dashboard
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-agro-brown-light to-agro-green-light px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col items-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-agro-green p-3 rounded-full mb-2 shadow-md">
            <FaLeaf className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-agro-green mb-1 font-serif">Anand Agro</h1>
          <span className="text-agro-brown-dark text-lg font-medium tracking-wide">Jaggery Organic Products</span>
        </div>
        {/* Login Form */}
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-agro-green mb-1">Email</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-agro-brown-dark" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-agro-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-agro-green mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-agro-brown-dark" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-agro-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium shadow-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-agro-brown-dark text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-agro-green font-semibold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
