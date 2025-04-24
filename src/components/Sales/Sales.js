import React, { useState, useEffect } from 'react';

// import { Line } from 'react-chartjs-2'; // Removed if not used
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

function Sales() {




  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [total] = useState(0);

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    // In a real app, fetch products from API
    setProducts([
      { id: 1, name: 'Product 1', price: 10.99, stock: 50 },
      { id: 2, name: 'Product 2', price: 15.99, stock: 30 },
      { id: 3, name: 'Product 3', price: 20.99, stock: 20 },
    ]);
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const fetchSales = async () => {
    try {
      const response = await fetch('/data/sales.json');
      const data = await response.json();
      setSales(data.sales);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const calculateTotal = (sales) => {
    return sales.reduce((sum, sale) => sum + sale.total, 0);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    // In a real app, process payment and create order
    alert('Order placed successfully!');
    setCart([]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">In stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-gray-50 p-6 border-l">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        <div className="space-y-4 mb-4 max-h-[calc(100vh-300px)] overflow-auto">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{item.name}</h3>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sales; 