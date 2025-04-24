import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.sku === product.sku);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (sku) => {
    setCart(prevCart => prevCart.filter(item => item.sku !== sku));
  };

  const updateQuantity = (sku, quantity) => {
    if (quantity <= 0) {
      removeFromCart(sku);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.sku === sku ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  const calculateTotal = () => {
    const newTotal = cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotal(newTotal);
  };

  const value = {
    cart,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 