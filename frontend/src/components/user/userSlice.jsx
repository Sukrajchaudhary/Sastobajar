import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ResetPasswordLink } from "./userAPI";
const initialState = {
  status: "idle",
  ResetLink:false,
  Error:null
};

export const ResetPasswordLinkAsync = createAsyncThunk(
  "user/ResetPasswordLink",
  async (to,{rejectWithValue}) => {
    try {
        const response= await ResetPasswordLink(to);
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
        .addCase(ResetPasswordLinkAsync.pending, (state) => {
          state.status = "loading";
        })
        .addCase(ResetPasswordLinkAsync.fulfilled, (state, action) => {
          state.status = "idle";
         state.ResetLink=true
        })
        .addCase(ResetPasswordLinkAsync.rejected, (state, action) => {
          state.status = "idle";
         state.Error=action.payload
        })
     
    },
  });
  
  export const {} = userSlice.actions;
  export const resetLink = (state) => state.user.ResetLink;
  export const ErrorMessage = (state) => state.user.Error;

 
  
  export default userSlice.reducer;