import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../components/Auth/authSlice";
import productReducers from "../components/Product/productSlice"
import cartReducers from "../components/Cart/cartSlice";
import orderReducers from "../components/order/orderSlice"
export const store = configureStore({
  reducer: {
    auth: authReducers,
    product:productReducers,
    cart:cartReducers,
    order:orderReducers
  },
});
