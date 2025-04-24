import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    role: 'cashier'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For now, we'll just navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo Image */}
            <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center">
              <img
                src="/images/shopeasepro.jpg"
                alt="ShopEase Pro Logo"
                className="w-40 h-40 object-contain"
              />
            </div>

            {/* Brand Name */}
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-2">
                ShopEase Pro
              </h1>
              <p className="text-xl text-gray-600">
                Professional Retail Management System
              </p>
            </div>

            {/* Brand Description */}
            <div className="max-w-2xl text-center">
              <p className="text-gray-600 leading-relaxed">
                ShopEase Pro is a comprehensive retail management solution designed to streamline
                your business operations. From inventory management to sales tracking,
                our platform provides all the tools you need to run your retail business efficiently.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
                <p className="text-gray-600">Track stock levels and manage products efficiently</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales Analytics</h3>
                <p className="text-gray-600">Monitor sales trends and business performance</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-600">Role-based access control for your team</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logo; 