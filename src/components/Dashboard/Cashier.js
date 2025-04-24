import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { QrReader } from 'react-qr-reader';

function CashierDashboard() {
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart, updateQuantity, total, calculateTotal } = useCart();
  const [products, setProducts] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [change, setChange] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleScan = (result) => {
    if (result) {
      const product = products.find(p => p.sku === result);
      if (product) {
        addToCart(product);
        setShowScanner(false);
      }
    }
  };

  const handlePayment = async () => {
    if (amountPaid < total) {
      alert('Amount paid is less than total');
      return;
    }

    const change = amountPaid - total;
    setChange(change);

    // Create new sale
    const newSale = {
      id: `SALE${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      subtotal: total,
      tax: total * 0.08, // 8% tax
      total: total + (total * 0.08),
      paymentMethod,
      cashier: user.name,
      status: 'completed'
    };

    try {
      // Update sales.json
      const response = await fetch('/data/sales.json');
      const data = await response.json();
      data.sales.push(newSale);
      
      // Update products stock
      cart.forEach(item => {
        const product = products.find(p => p.sku === item.sku);
        if (product) {
          product.stock -= item.quantity;
        }
      });

      // Reset cart and payment
      setCart([]);
      setAmountPaid(0);
      setChange(0);
      alert('Sale completed successfully!');
    } catch (error) {
      console.error('Error processing sale:', error);
      alert('Error processing sale');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            <button
              onClick={() => setShowScanner(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Scan QR
            </button>
          </div>
          
          {showScanner && (
            <div className="mb-4">
              <QrReader
                onResult={handleScan}
                constraints={{ facingMode: 'environment' }}
                className="w-full"
              />
              <button
                onClick={() => setShowScanner(false)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel Scan
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map(item => (
                  <tr key={item.sku}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.sku, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => removeFromCart(item.sku)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-lg font-semibold">
              Total: ${total.toFixed(2)}
            </div>
            <button
              onClick={() => setCart([])}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount Paid
              </label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {change > 0 && (
              <div className="text-green-600">
                Change: ${change.toFixed(2)}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={cart.length === 0}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashierDashboard; 