import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getProducts = async () => {
  try {
    if (API_BASE_URL) {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      return response.data;
    } else {
      // Fallback to local static file
      const response = await fetch('/data/products.json');
      const data = await response.json();
      return data.products || [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/products`, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}; 