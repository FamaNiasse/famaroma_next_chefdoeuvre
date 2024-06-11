import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaSearch, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

interface User {
  id: number;
  pseudo: string;
  email: string;
  username: string; // Ajoute cette propriété si nécessaire
  role: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
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

        const userData = response.data;
        if (userData.role !== 1) {
          router.push('/dashboard'); // Rediriger les utilisateurs non autorisés vers une autre page
          return;
        }

        const usersResponse = await axios.get('http://localhost:8081/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(usersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        router.push('/login');
      }
    };

    fetchUsers();
  }, [router]);

  const handleDelete = async (userId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8081/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (userId: number) => {
    // Redirige vers une page d'édition ou ouvre un modal pour modifier l'utilisateur
    console.log('Edit user with ID:', userId);
    // Exemple de redirection :
    router.push(`/edit-user/${userId}`);
  };

  const handleAdd = () => {
    // Redirige vers une page d'ajout ou ouvre un modal pour ajouter un nouvel utilisateur
    console.log('Add new user');
    // Exemple de redirection :
    router.push(`/add-user`);
  };

  const filteredUsers = users.filter(user =>
    user.pseudo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-fuchsia-700 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-fuchsia-800">
            Users
          </a>
          <a href="#" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-fuchsia-800">
            Settings
          </a>
          <a href="#" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-fuchsia-800">
            Deploy
          </a>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Users</h2>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
            />
            <FaSearch className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={handleAdd}
            className="text-white bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded-lg transition duration-200 ml-4 flex items-center"
          >
            <FaPlus className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.pseudo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">@{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200 flex items-center"
                    >
                      <FaEdit className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200 flex items-center"
                    >
                      <FaTrashAlt className="h-5 w-5 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
