import React, { useState, useEffect } from 'react';

function EmployeeSalaries() {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editSalary, setEditSalary] = useState('');

  useEffect(() => {
    fetch('/data/users.json')
      .then(res => res.json())
      .then(data => setEmployees(data.users));
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditSalary(employees[index].salary || '');
  };

  const handleSave = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].salary = parseFloat(editSalary);
    setEmployees(updatedEmployees);
    setEditIndex(null);
    // Save to backend or file
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Salaries</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp.id}>
              <td className="border px-4 py-2">{emp.id}</td>
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.role}</td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <input type="number" value={editSalary} onChange={e => setEditSalary(e.target.value)} className="border px-2" />
                ) : (
                  emp.salary || 'N/A'
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

export default EmployeeSalaries;
