'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState(null);

  // ✅ Load cart from cookie on first load
  useEffect(() => {
    const cookieCart = Cookies.get('cart');
    if (cookieCart) {
      try {
        setCartItems(JSON.parse(cookieCart));
      } catch (err) {
        console.error('Invalid cart cookie');
        Cookies.remove('cart'); // remove corrupted cookie
      }
    }
  }, []);

  // ✅ Update cookie when cart changes
  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cartItems), { expires: 7 }); // expires in 7 days
  }, [cartItems]);

  const addToCart = (product) => {
    const price = Number(product.price); // ✅ ensure number

    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: product.qty, price }
            : item
        );
      }
      return [...prev, { ...product, qty: product.qty, price }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    Cookies.remove('cart'); // Clear cookie when clearing cart
    clearDiscount(); // Clear discount too
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  // ✅ New discount-related functions
  const applyDiscount = (value, code) => {
    setDiscount(value);
    setCouponCode(code);
  };

  const clearDiscount = () => {
    setDiscount(0);
    setCouponCode(null);
  };

  // ✅ NEW: total after discount
  const total = Math.max(totalPrice - discount, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      discount,
      couponCode,
      applyDiscount,
      clearDiscount,
      setCouponCode,
      total // <-- added here
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
