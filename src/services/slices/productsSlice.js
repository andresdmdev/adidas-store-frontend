import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const URL = 'https://api-store-adidas.herokuapp.com/api/products'

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  singleProduct: {}
}

export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
  try {
    const res = await axios.get(URL)
    return [...res.data]
  } catch (error) {
    return error.message
  }
})

export const searchProductByName = createAsyncThunk("products/searchProductByName", async (name) => {
    try {
      const res = await axios.get(`${URL}/name/${name}`)
      return [...res.data]
    } catch (error) {
      return error.message
    }
})

export const searchSingleProductById = createAsyncThunk("products/searchSingleProductById", async (id) => {
  try {
    const res = await axios.get(`${URL}/${id}`)
    return res.data
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
      .addCase(searchProductByName.fulfilled, (state, action) => {
        state.status = 'success'

        if(!Array.isArray(action.payload)){
          state.error = 'Not found'
        } else {
          state.error = null
          state.products = [...action.payload]
        }
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