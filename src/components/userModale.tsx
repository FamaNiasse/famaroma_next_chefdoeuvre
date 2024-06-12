import React, { useState, useEffect } from 'react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  user?: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(2);

  useEffect(() => {
    if (user) {
      setPseudo(user.pseudo);
      setEmail(user.email);
      setRole(user.role);
    } else {
      setPseudo('');
      setEmail('');
      setRole(2);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: user?.id, pseudo, email, role });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700">Pseudo</label>
            <input
              type="text"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
            >
              <option value={2}>User</option>
              <option value={1}>Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-fuchsia-800 text-white py-2 px-4 rounded-md hover:bg-fuchsia-700 transition duration-200"
            >
              {user ? 'Update' : 'Create'}
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
