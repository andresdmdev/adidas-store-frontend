import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiInstance";

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  singleProduct: {}
}

// Get all products form api
export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
  try {
    const res = await api.get('')
    return [...res.data]
  } catch (error) {
    return error.message
  }
})

// Get products by name form api
export const searchProductByName = createAsyncThunk("products/searchProductByName", async (name) => {
    try {
      const res = await api.get(`/name/${name}`)
      return [...res.data]
    } catch (error) {
      return error.message
    }
})

// Get products by id form api
export const searchSingleProductById = createAsyncThunk("products/searchSingleProductById", async (id) => {
  try {
    const res = await api.get(`/${id}`)
    return [...res.data]
  } catch (error) {
    return error.message
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = 'success'

        if(!Array.isArray(action.payload)){
          state.error = 'Network connection failed'
        } else {
          state.error = null
          state.products = [...action.payload]
        }
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = 'rejected'
      })
      .addCase(searchProductByName.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(searchProductByName.fulfilled, (state, action) => {
        state.status = 'success'

        if(!Array.isArray(action.payload)){
          state.error = 'Not found'
        } else {
          state.error = null
          state.products = [...action.payload]
        }
      })
      .addCase(searchProductByName.rejected, (state, action) => {
        state.status = 'rejected'
      })
      .addCase(searchSingleProductById.fulfilled, (state, action) => {
        state.status = 'success'
        if(!Array.isArray(action.payload)){
          state.error = 'Not found'
        } else {
          state.error = null
          state.singleProduct = action.payload[0]
        }
      })
  }
})

export const selectSingleProduct = (state) => state.products.singleProduct;

export const selectAllProducts = (state) => state.products.products;

export const selectStatus = (state) => state.products.status;

export const showError = (state) => state.products.error;

export default productsSlice.reducer