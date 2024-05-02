import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUsers,
  LoginUser,
  checkuser,
  LogOutUser,
  UpdateAddress,
} from "./authAPI";
const initialState = {
  value: 0,
  status: "idle",
  isLoading: false,
  error: null,
  LoginErrror: null,
  CheckLoginUserInfo: null,
  Logout: null,
  LogoutError: null,
  updateUser: null,
  User: null,
};

export const createUsersAsync = createAsyncThunk(
  "auth/createUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createUsers(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const LoginUserAsync = createAsyncThunk(
  "auth/LoginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await LoginUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const LogOutUserAsync = createAsyncThunk(
  "auth/LogOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LogOutUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const UpdateAddressAsync = createAsyncThunk(
  "auth/UpdateAddress",
  async (data, { rejectWithValue }) => {
    try {
      const response = await UpdateAddress(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkuserAsync = createAsyncThunk("auth/checkuser", async () => {
  const response = await checkuser();
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUsersAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.User = action.payload;
        state.isLoading = false;
      })
      .addCase(createUsersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.User = action.payload;
        state.isLoading = false;
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.LoginErrror = action.payload;
        state.isLoading = false;
      })
      .addCase(checkuserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkuserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.CheckLoginUserInfo = action.payload;
      })
      .addCase(LogOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LogOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Logout = action.payload;
        state.User = null;
      })
      .addCase(LogOutUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.LogoutError = action.payload;
      })
      .addCase(UpdateAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.User = action.payload;
      });
  },
});

export const {} = authSlice.actions;
export const SignupError = (state) => state.auth.error;
export const SignUp = (state) => state.auth.User;
export const signupLoading = (state) => state.auth.isLoading;
export const LoginUserInfo = (state) => state.auth.User;
export const LoginError = (state) => state.auth.LoginErrror;
export const LoginUserDetails = (state) => state.auth.CheckLoginUserInfo;
export const logoutInfo = (state) => state.auth.Logout;
export const LogoutErrorLog = (state) => state.auth.LogoutError;

export default authSlice.reducer;
