import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function SalesReport() {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [salesData, setSalesData] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    averageOrder: 0,
    totalOrders: 0,
    topProducts: [],
  });

  useEffect(() => {
    // In a real app, fetch data from API
    const mockData = generateMockData();
    setSalesData(mockData);
    calculateSummary(mockData);
  }, [dateRange]);

  const generateMockData = () => {
    // Generate mock sales data
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(new Date().setDate(new Date().getDate() - i)).toISOString(),
      total: Math.random() * 1000 + 500,
      orders: Math.floor(Math.random() * 20 + 10),
      products: [
        { name: 'Product A', quantity: Math.floor(Math.random() * 10) },
        { name: 'Product B', quantity: Math.floor(Math.random() * 10) },
        { name: 'Product C', quantity: Math.floor(Math.random() * 10) },
      ],
    }));
  };

  const calculateSummary = (data) => {
    const totalSales = data.reduce((sum, day) => sum + day.total, 0);
    const totalOrders = data.reduce((sum, day) => sum + day.orders, 0);
    
    // Calculate top products
    const productSales = {};
    data.forEach(day => {
      day.products.forEach(product => {
        productSales[product.name] = (productSales[product.name] || 0) + product.quantity;
      });
    });

    const topProducts = Object.entries(productSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    setSummary({
      totalSales,
      averageOrder: totalSales / totalOrders,
      totalOrders,
      topProducts,
    });
  };

  const lineChartData = {
    labels: salesData.map(day => new Date(day.date).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Daily Sales',
        data: salesData.map(day => day.total).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: salesData.map(day => new Date(day.date).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Number of Orders',
        data: salesData.map(day => day.orders).reverse(),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  const pieChartData = {
    labels: summary.topProducts.map(([name]) => name),
    datasets: [
      {
        data: summary.topProducts.map(([, quantity]) => quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales Report</h1>
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${summary.totalSales.toFixed(2)}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {summary.totalOrders}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${summary.averageOrder.toFixed(2)}
            </dd>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Daily Sales Trend</h2>
          <div className="h-80">
            <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Daily Orders</h2>
          <div className="h-80">
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Products</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity Sold
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {summary.topProducts.map(([name, quantity]) => (
                  <tr key={name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesReport; 