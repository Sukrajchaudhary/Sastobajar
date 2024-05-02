import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllUsersProducts,
  getProduct,
  getAllCategory,
  AddProduct,
  getUserProduct
} from "./productAPI";

const initialState = {
  status: "idle",
  product: [],
  addedProduct:[],
  error: "",
  selectedProduct: {},
  category: [],
  isLoading: false,
  TotalProduct: null,
  uploadStatus:false,
  userProduct:[]

};

export const AddProductAsync = createAsyncThunk(
  "product/AddProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AddProduct(formData);
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getAllUsersProductsAsync = createAsyncThunk(
  "product/getAllUsersProducts",
  async ({ Filter, Sort, pagination, SearchObj }, { rejectWithValue }) => {
    try {
      const response = await getAllUsersProducts(
        Filter,
        Sort,
        pagination,
        SearchObj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductAsync = createAsyncThunk(
  "product/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getUserProductAsync = createAsyncThunk(
  "product/getUserProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserProduct();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllCategorytAsync = createAsyncThunk(
  "product/getAllCategory",
  async (_,{rejectWithValue}) => {
    try {
      const response = await getAllCategory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersProductsAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getAllUsersProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload.products;
        state.TotalProduct = action.payload.totalItems;
        state.isLoading = false;
      })
      .addCase(getAllUsersProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      //
      .addCase(AddProductAsync.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(AddProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addedProduct.push(action.payload);
        state.isLoading = false;
      })
      .addCase(AddProductAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      // 
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getAllCategorytAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(getAllCategorytAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getUserProductAsync.pending,(state,action)=>{
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getUserProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProduct = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserProductAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const {} = productSlice.actions;
export const Allproduct = (state) => state.product.product;
export const selectproduct = (state) => state.product.selectedProduct;
export const error = (state) => state.product.error;
export const Allcategory = (state) => state.product.category;
export const Loadingstate = (state) => state.product.isLoading;
export const TotalCount = (state) => state.product.TotalProduct;
export const createdProduct=(state)=>state.product.addedProduct
export const UsercreatedProduct=(state)=>state.product.userProduct

export default productSlice.reducer;
