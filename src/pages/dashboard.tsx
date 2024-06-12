import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaEdit, FaSave } from 'react-icons/fa';

interface User {
  id: number;
  pseudo: string;
  email: string;
  role: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
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
        setPseudo(response.data.pseudo);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8081/users/${user?.id}`,
        { pseudo, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Pseudo</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
          />
        </div>
        <div className="flex justify-end">
          {editMode ? (
            <button
              onClick={handleSave}
              className="text-white bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded-lg transition duration-200 flex items-center"
            >
              <FaSave className="h-5 w-5 mr-2" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200 flex items-center"
            >
              <FaEdit className="h-5 w-5 mr-2" />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
