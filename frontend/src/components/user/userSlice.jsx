import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ForgrtPassword } from "./userAPI";
const initialState = {
  status: "idle",
};

export const ForgrtPasswordAsync = createAsyncThunk(
  "user/ForgrtPassword",
  async (_,{rejectWithValue}) => {
    try {
        const response= await ForgrtPassword();
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
  }
);


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
      builder
        .addCase(ForgrtPasswordAsync.pending, (state) => {
          state.status = "loading";
          state.isLoading = true;
        })
        .addCase(ForgrtPasswordAsync.fulfilled, (state, action) => {
          state.status = "idle";
         
        })
     
    },
  });
  
  export const {} = userSlice.actions;
  export const Allproduct = (state) => state.product.product;
 
  
  export default userSlice.reducer;