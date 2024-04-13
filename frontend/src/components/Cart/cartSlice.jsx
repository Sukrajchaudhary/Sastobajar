import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCart,
  getuserCartItems,
  deleteCartItem,
  updateCart,
} from "./cartAPI";

const initialState = {
  value: 0,
  status: "idle",
  isLoading: false,
  items: [],
};

export const createCartAsync = createAsyncThunk(
  "cart/createCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCart(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getuserCartItemsAsync = createAsyncThunk(
  "cart/getuserCartItems",
  async () => {
    const response = await getuserCartItems();
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    const response = await deleteCartItem(id);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createCartAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading=false;
      })
      .addCase(getuserCartItemsAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getuserCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.isLoading = false;
      })

      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item._id === action.payload.cart._id
        );

        state.items.splice(index, 1);
        state.isLoading = false;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.items[index] = action.payload;
        state.isLoading = false;
      });
  },
});

export const {} = cartSlice.actions;
export const createdCart = (state) => state.cart.items;
export const LoaddingState = (state) => state.cart.isLoading;

export default cartSlice.reducer;
