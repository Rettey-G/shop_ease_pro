import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">ShopEase Pro</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Admin Modules Quick Links */}
        <a href="/products" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Products</h3>
          <p>Manage and edit products</p>
        </a>
        <a href="/sales" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Sales</h3>
          <p>View and edit sales</p>
        </a>
        <a href="/employee-salaries" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Employee Salaries</h3>
          <p>Manage employee salaries</p>
        </a>
        <a href="/sales-report" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Sales Report</h3>
          <p>View sales analytics</p>
        </a>
        <a href="/sales-cart" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Sales Cart</h3>
          <p>Manage sales cart</p>
        </a>
        <a href="/bills" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Bills</h3>
          <p>View and edit bills</p>
        </a>
        <a href="/inventory" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Inventory</h3>
          <p>Manage inventory stock</p>
        </a>
        <a href="/purchase-orders" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Purchase Orders</h3>
          <p>Manage purchase orders</p>
        </a>
        <a href="/users" className="bg-white shadow rounded-lg p-6 hover:bg-blue-50 block">
          <h3 className="font-semibold text-lg mb-2">Users</h3>
          <p>Manage users</p>
        </a>
            {/* Total Sales Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">$0.00</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">0</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Products in Stock Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Products in Stock</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">0</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                New Sale
              </button>
              <button className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Add Product
              </button>
              <button className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 