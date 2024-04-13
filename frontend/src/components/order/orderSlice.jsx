import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeOrder, getAllUserOrders } from "./orderAPI";

const initialState = {
  value: 0,
  status: "idle",
  order: null,
  error: null,
  userOrders: [],
};

export const makeOrderAsync = createAsyncThunk(
  "order/makeOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await makeOrder(order);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getAllUserOrdersAsync = createAsyncThunk(
  "order/getAllUserOrders",
  async () => {
    const response = await getAllUserOrders();
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(makeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(makeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(makeOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getAllUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      
  },
});

export const {} = orderSlice.actions;
export const UserOrders = (state) => state.order.order;
export const OrderError = (state) => state.order.error;
export const getUserOrders=(state)=>state.order.userOrders

export default orderSlice.reducer;
