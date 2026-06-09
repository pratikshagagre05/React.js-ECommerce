import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const toggleLike = (id) => {
    setLikes(
      likes.includes(id) ? likes.filter((i) => i !== id) : [...likes, id]
    );
  };

  return (
    <AppContext.Provider
      value={{ cart, addToCart, removeFromCart, likes, toggleLike }}
    >
      {children}
    </AppContext.Provider>
  );
};
