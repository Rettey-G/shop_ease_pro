const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, 'public', 'data', 'products.json');
const USERS_PATH = path.join(__dirname, 'public', 'data', 'users.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read products.json
function readProducts() {
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data).products;
}

// Helper to write products.json
function writeProducts(products) {
  fs.writeFileSync(DATA_PATH, JSON.stringify({ products }, null, 2), 'utf-8');
}

// Helper to read users.json
function readUsers() {
  const data = fs.readFileSync(USERS_PATH, 'utf-8');
  return JSON.parse(data).users;
}

// Helper to write users.json
function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify({ users }, null, 2), 'utf-8');
}

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products.' });
  }
});

// ADD a new product
app.post('/api/products', (req, res) => {
  try {
    const products = readProducts();
    const product = req.body;
    // Check for unique SKU
    if (products.some(p => p.sku === product.sku)) {
      return res.status(400).json({ error: 'SKU must be unique.' });
    }
    products.push(product);
    writeProducts(products);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product.' });
  }
});

// EDIT a product by SKU
app.put('/api/products/:sku', (req, res) => {
  try {
    const products = readProducts();
    const sku = req.params.sku;
    const updated = req.body;
    const idx = products.findIndex(p => p.sku === sku);
    if (idx === -1) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    products[idx] = { ...products[idx], ...updated };
    writeProducts(products);
    res.json(products[idx]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

// DELETE a product by SKU
app.delete('/api/products/:sku', (req, res) => {
  try {
    const products = readProducts();
    const sku = req.params.sku;
    const initialLen = products.length;
    products = products.filter(p => p.sku !== sku);
    if (products.length === initialLen) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    writeProducts(products);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

// --- USER MANAGEMENT API ---
// GET all users
app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users.' });
  }
});

// ADD a new user
app.post('/api/users', (req, res) => {
  try {
    const users = readUsers();
    const user = req.body;
    // Check for unique email
    if (users.some(u => u.email === user.email)) {
      return res.status(400).json({ error: 'Email must be unique.' });
    }
    user.id = `USER${String(users.length + 1).padStart(3, '0')}`;
    user.createdAt = new Date().toISOString();
    user.lastLogin = null;
    users.push(user);
    writeUsers(users);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user.' });
  }
});

// EDIT a user by ID
app.put('/api/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const id = req.params.id;
    const updated = req.body;
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'User not found.' });
    }
    users[idx] = { ...users[idx], ...updated };
    writeUsers(users);
    res.json(users[idx]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

// DELETE a user by ID
app.delete('/api/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const id = req.params.id;
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const deleted = users.splice(idx, 1);
    writeUsers(users);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

app.listen(PORT, () => {
  console.log(`Products API server running on http://localhost:${PORT}`);
});
