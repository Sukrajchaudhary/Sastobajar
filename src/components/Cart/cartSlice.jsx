import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCart, getuserCartItems, deleteCartItem,updateCart } from "./cartAPI";

const initialState = {
  value: 0,
  status: "idle",
  isLoading: false,
  items: [],
  userCartItems: [],
  deleteCart: {},
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
      })
      .addCase(getuserCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getuserCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userCartItems = action.payload;
      })

      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.cart._id
        );
        state.items.splice(index, 1);
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.userCartItems.findIndex(
          (item) => item.id !== action.payload.cart._id
        );
        state.userCartItems[index]=action.payload
      });
  },
});

export const {} = cartSlice.actions;
export const cartitems = (state) => state.cart.items;
export const item = (state) => state.cart.userCartItems;
export const deleteitems = (state) => state.cart.deleteCart;

export default cartSlice.reducer;
