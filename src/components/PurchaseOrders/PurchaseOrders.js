import React, { useState, useEffect } from 'react';

function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ supplier: '', items: '', total: '' });

  useEffect(() => {
    // For demo, empty or fetch from backend
    setOrders([]);
  }, []);

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAddOrder = () => {
    setOrders([...orders, { ...newOrder, id: Date.now() }]);
    setNewOrder({ supplier: '', items: '', total: '' });
    // Save to backend or file
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Purchase Orders</h2>
      <div className="mb-4">
        <input name="supplier" value={newOrder.supplier} onChange={handleChange} placeholder="Supplier" className="border px-2 mr-2" />
        <input name="items" value={newOrder.items} onChange={handleChange} placeholder="Items" className="border px-2 mr-2" />
        <input name="total" value={newOrder.total} onChange={handleChange} placeholder="Total" type="number" className="border px-2 mr-2" />
        <button onClick={handleAddOrder} className="bg-blue-500 text-white px-2 py-1 rounded">Add Order</button>
      </div>
      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Supplier</th>
            <th className="border px-4 py-2">Items</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.supplier}</td>
              <td className="border px-4 py-2">{order.items}</td>
              <td className="border px-4 py-2">{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseOrders;
