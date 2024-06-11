import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/users/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard'); // Redirige vers le tableau de bord après connexion
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-fuchsia-200 focus:border-fuchsia-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-fuchsia-200 focus:border-fuchsia-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-fuchsia-600 rounded-md hover:bg-fuchsia-700 focus:outline-none focus:bg-fuchsia-700"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center">
          Vous n'avez pas de compte ? <a href="/signup" className="text-fuchsia-600">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
