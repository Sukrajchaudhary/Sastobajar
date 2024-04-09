import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUsers, LoginUser, checkuser,LogOutUser } from "./authAPI";
const initialState = {
  value: 0,
  status: "idle",
  SignUpuser: null,
  isLoading: false,
  error: null,
  Login: null,
  LoginErrror: null,
  CheckLoginUserInfo: null,
  Logout:null,
  LogoutError:null
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
        state.SignUpuser = action.payload;
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
        state.Login = action.payload;
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
      })
      .addCase(LogOutUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.LogoutError = action.payload;
      })
     
  },
});

export const {} = authSlice.actions;
export const SignupError = (state) => state.auth.error;
export const SignUp = (state) => state.auth.SignUpuser;
export const signupLoading = (state) => state.auth.isLoading;
export const LoginUserInfo = (state) => state.auth.Login;
export const LoginError = (state) => state.auth.LoginErrror;
export const LoginUserDetails = (state) => state.auth.CheckLoginUserInfo;
export const logoutInfo=(state)=>state.auth.Logout;
export const LogoutErrorLog=(state)=>state.auth.LogoutError;



export default authSlice.reducer;
