import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface User {
    id: number;
    pseudo: string;
    email: string;
    role: number;
  }

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8081/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User data:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome, {user.pseudo}!</p>
      <p>Your email: {user.email}</p>
      {/* Ajoute d'autres informations pertinentes pour l'utilisateur ici */}
    </div>
  );
};

export default Dashboard;
