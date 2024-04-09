import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../components/Auth/authSlice";
import productReducers from "../components/Product/productSlice"
import cartReducers from "../components/Cart/cartSlice"
export const store = configureStore({
  reducer: {
    auth: authReducers,
    product:productReducers,
    cart:cartReducers
  },
});
