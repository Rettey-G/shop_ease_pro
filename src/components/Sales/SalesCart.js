import React, { useState } from 'react';

function SalesCart() {
  const [cart, setCart] = useState([
    { sku: 'PROD001', name: 'Sample Product 1', quantity: 2, price: 19.99 },
  ]);

  const handleQuantityChange = (idx, value) => {
    const newCart = [...cart];
    newCart[idx].quantity = parseInt(value, 10);
    setCart(newCart);
  };

  const handleRemove = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Cart</h2>
      <table className="min-w-full table-auto border mb-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">SKU</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={item.sku}>
              <td className="border px-4 py-2">{item.sku}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">
                <input type="number" min="1" value={item.quantity} onChange={e => handleQuantityChange(idx, e.target.value)} className="border px-2 w-16" />
              </td>
              <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
              <td className="border px-4 py-2">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleRemove(idx)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
    </div>
  );
}

export default SalesCart;
