import React, { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }, []);
  
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
  
    const addToCart = (product) => {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, product];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    };
  
    const removeFromCart = (productId) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
  
    return (
      <BasketContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </BasketContext.Provider>
    );
  };
  