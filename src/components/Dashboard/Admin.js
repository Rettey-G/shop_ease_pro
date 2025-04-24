import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    recentActivity: [],
  });

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, salesRes] = await Promise.all([
          fetch('/data/users.json'),
          fetch('/data/products.json'),
          fetch('/data/sales.json'),
        ]);

        const users = await usersRes.json();
        const products = await productsRes.json();
        const sales = await salesRes.json();

        setStats({
          totalUsers: users.users.length,
          totalProducts: products.products.length,
          totalSales: sales.sales.length,
          recentActivity: sales.sales.slice(-5).reverse(),
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const salesData = {
    labels: stats.recentActivity.map(sale => new Date(sale.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Sales',
        data: stats.recentActivity.map(sale => sale.total),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Users
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalUsers}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Products
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalProducts}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Sales
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalSales}
            </dd>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Sales Activity
        </h2>
        <div className="h-64">
          <Line data={salesData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="flow-root">
          <ul className="-mb-8">
            {stats.recentActivity.map((sale, index) => (
              <li key={sale.id}>
                <div className="relative pb-8">
                  {index !== stats.recentActivity.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <svg
                          className="h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Sale #{sale.id} - {new Date(sale.date).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={sale.date}>
                          ${sale.total.toFixed(2)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 