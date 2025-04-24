import React, { useState, useEffect } from 'react';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editStock, setEditStock] = useState('');

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditStock(products[index].stock);
  };

  const handleSave = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].stock = parseInt(editStock, 10);
    setProducts(updatedProducts);
    setEditIndex(null);
    // Here you would send updatedProducts to backend or save to file
    // For demo: localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">SKU</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={product.sku}>
              <td className="border px-4 py-2">{product.sku}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <input type="number" value={editStock} onChange={e => setEditStock(e.target.value)} className="border px-2" />
                ) : (
                  product.stock
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <button onClick={() => handleSave(idx)} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                ) : (
                  <button onClick={() => handleEdit(idx)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
