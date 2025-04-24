 import React, { useState } from 'react';

function Bills() {
  const [bills, setBills] = useState([
    { id: 'BILL001', customer: 'John Doe', amount: 100.5, status: 'Paid' },
    { id: 'BILL002', customer: 'Jane Smith', amount: 75.0, status: 'Unpaid' },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editBill, setEditBill] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditBill({ ...bills[index] });
  };

  const handleChange = (e) => {
    setEditBill({ ...editBill, [e.target.name]: e.target.value });
  };

  const handleSave = (index) => {
    const updatedBills = [...bills];
    updatedBills[index] = editBill;
    setBills(updatedBills);
    setEditIndex(null);
    // Save to backend or file
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bills Management</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, idx) => (
            <tr key={bill.id}>
              <td className="border px-4 py-2">{bill.id}</td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <input name="customer" value={editBill.customer} onChange={handleChange} className="border px-2" />
                ) : (
                  bill.customer
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <input name="amount" type="number" value={editBill.amount} onChange={handleChange} className="border px-2" />
                ) : (
                  bill.amount
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <select name="status" value={editBill.status} onChange={handleChange} className="border px-2">
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                ) : (
                  bill.status
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

export default Bills;