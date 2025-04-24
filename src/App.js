import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Sidebar from './components/Navigation/Sidebar';
import Navigation from './components/Navigation/Navigation';
import Products from './components/Products/Products';
import Sales from './components/Sales/Sales';
import SalesCart from './components/Sales/SalesCart';
import SalesReport from './components/Reports/SalesReport';
import Bills from './components/Bills/Bills';
import Inventory from './components/Inventory/Inventory';
import PurchaseOrders from './components/PurchaseOrders/PurchaseOrders';
import EmployeeSalaries from './components/Employee/EmployeeSalaries';
import Users from './components/Users/Users';

function App() {
  // Check if user is on login page
  const isLoginPage = window.location.pathname === '/login';

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className={`flex-1 ${!isLoginPage ? 'ml-64' : ''}`}>
        {!isLoginPage && <Navigation />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales-cart" element={<SalesCart />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/employee-salaries" element={<EmployeeSalaries />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;