import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ManagerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    lowStockItems: [],
    dailySales: [],
    topProducts: [],
  });

  useEffect(() => {
    // Fetch manager dashboard statistics
    const fetchStats = async () => {
      try {
        const [productsRes, salesRes] = await Promise.all([
          fetch('/data/products.json'),
          fetch('/data/sales.json'),
        ]);

        const products = await productsRes.json();
        const sales = await salesRes.json();

        // Find low stock items (less than 10 in stock)
        const lowStock = products.products
          .filter(product => product.stock < 10)
          .sort((a, b) => a.stock - b.stock);

        // Calculate daily sales
        const dailySales = sales.sales.reduce((acc, sale) => {
          const date = new Date(sale.date).toLocaleDateString();
          acc[date] = (acc[date] || 0) + sale.total;
          return acc;
        }, {});

        // Find top selling products
        const productSales = sales.sales.reduce((acc, sale) => {
          sale.items.forEach(item => {
            acc[item.sku] = (acc[item.sku] || 0) + item.quantity;
          });
          return acc;
        }, {});

        const topProducts = Object.entries(productSales)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([sku, quantity]) => {
            const product = products.products.find(p => p.sku === sku);
            return { ...product, quantity };
          });

        setStats({
          lowStockItems: lowStock,
          dailySales: Object.entries(dailySales).map(([date, total]) => ({ date, total })),
          topProducts,
        });
      } catch (error) {
        console.error('Error fetching manager stats:', error);
      }
    };

    fetchStats();
  }, []);

  const salesData = {
    labels: stats.dailySales.map(sale => sale.date),
    datasets: [
      {
        label: 'Daily Sales',
        data: stats.dailySales.map(sale => sale.total),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Low Stock Items
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.lowStockItems.map(product => (
                <tr key={product.sku}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Daily Sales
        </h2>
        <div className="h-64">
          <Bar data={salesData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Top Selling Products
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.topProducts.map(product => (
                <tr key={product.sku}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard; 