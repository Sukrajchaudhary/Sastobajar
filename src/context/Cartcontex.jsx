import { createContext, useContext, useState } from "react";

export const cartContex = createContext();

export const useCartContext = () => {
  return useContext(cartContex);
};

export const CartContextProvider = ({ children }) => {
  const [cartItems,setCartItems]=useState([])
  return (
    <cartContex.Provider value={{setCartItems,cartItems}}>{children}</cartContex.Provider>
  );
};
