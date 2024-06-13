import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaSearch, FaTrashAlt, FaEdit, FaPlus, FaUsers, FaBox } from 'react-icons/fa';
import UserModal from '@/components/userModale';
import ProductModal from '@/components/productModale';
import BackButton from '@/components/backButton';


interface User {
  id: number;
  pseudo: string;
  email: string;
  username: string;
  role: number;
}

interface Product {
  id: number;
  nom_produit: string;
  image: string;
  description: string;
  prix: number;
  promo: boolean;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const userResponse = await axios.get('http://localhost:8081/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data;
        if (userData.role !== 1) {
          router.push('/dashboard');
          return;
        }

        const usersResponse = await axios.get('http://localhost:8081/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const productsResponse = await axios.get('http://localhost:8081/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(usersResponse.data);
        setProducts(productsResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/login');
      }
    };

    fetchData();
  }, [router]);

  const handleUserDelete = async (userId: number) => {
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

  const handleProductDelete = async (productId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8081/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUserEdit = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleProductEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleUserAdd = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleProductAdd = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleUserSave = async (user: User) => {
    const token = localStorage.getItem('token');
    try {
      if (user.id) {
        await axios.put(`http://localhost:8081/users/${user.id}`, user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        const newUser = { pseudo: user.pseudo, email: user.email, password: "defaultPassword", role: user.role };
        await axios.post('http://localhost:8081/users/signup', newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setIsUserModalOpen(false);
      const usersResponse = await axios.get('http://localhost:8081/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleProductSave = async (product: Product) => {
    const token = localStorage.getItem('token');
    try {
      if (product.id) {
        await axios.put(`http://localhost:8081/products/${product.id}`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:8081/products', product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setIsProductModalOpen(false);
      const productsResponse = await axios.get('http://localhost:8081/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(productsResponse.data.data);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.pseudo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.nom_produit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-fuchsia-700 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <button
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-fuchsia-800 ${activeTab === 'users' ? 'bg-fuchsia-800' : ''
              }`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers className="mr-2" /> Users
          </button>
          <button
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-fuchsia-800 ${activeTab === 'products' ? 'bg-fuchsia-800' : ''
              }`}
            onClick={() => setActiveTab('products')}
          >
            <FaBox className="mr-2" /> Products
          </button>
        </nav>
      </div>
      <div className="flex-1 p-6">
      <BackButton />
        {activeTab === 'users' && (
          <>
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
                onClick={handleUserAdd}
                className="text-white bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded-lg transition duration-200 ml-4 flex items-center"
              >
                <FaPlus className="h-5 w-5 mr-2" />
                Add User
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
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
                          onClick={() => handleUserEdit(user)}
                          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200 flex items-center"
                        >
                          <FaEdit className="h-5 w-5 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleUserDelete(user.id)}
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
          </>
        )}
        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Products</h2>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
                />
                <FaSearch className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={handleProductAdd}
                className="text-white bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded-lg transition duration-200 ml-4 flex items-center"
              >
                <FaPlus className="h-5 w-5 mr-2" />
                Add Product
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.nom_produit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.prix}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.promo ? 'Yes' : 'No'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                        <button
                          onClick={() => handleProductEdit(product)}
                          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200 flex items-center"
                        >
                          <FaEdit className="h-5 w-5 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleProductDelete(product.id)}
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
          </>
        )}
      </div>
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleUserSave}
        user={selectedUser}
      />
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleProductSave}
        product={selectedProduct}
      />
    </div>
  );
};

export default AdminDashboard;
