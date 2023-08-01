import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiInstance";
import newProducts from "./helpers/newProducts";
import quantityProduct from "./helpers/quantityProduct";
import { data } from "./helpers/data-test";

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  singleProduct: {},
  favoriteProducts: JSON.parse(localStorage.getItem('favorites')) || [],
  cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
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
  reducers: {
    // Add and delete products from favorites
    addFavorite: (state, action) => {

      const { id } = action.payload

      state.products = state.products.map(elem => {
        if(elem.id === id){
          return { ...elem, favorite: !elem.favorite }
        } else {
          return elem
        }
      })

      const product = state.products.find(elem => elem.id === id)

      if(product.favorite){
        state.favoriteProducts.push(product)
      } else{
        state.favoriteProducts = state.favoriteProducts.filter(elem => elem.id !== id)
      }

      localStorage.setItem('favorites', JSON.stringify(state.favoriteProducts))
    },
    // Reset cart products to cero and set in local storage
    resetCart: (state, action) => {
      
      state.products = state.products.map(elem => ({ ...elem, quantity: 0 }))
      
      state.cartProducts = []

      localStorage.setItem('cart', JSON.stringify(state.cartProducts))
    },
    // Delect a product in cart products and set in local storage
    deleteProductCart: (state, action) => {

      const idProduct = action.payload

      state.products = quantityProduct(state.products, idProduct, 0)

      state.cartProducts = state.cartProducts.filter(product => product.id !== idProduct)

      localStorage.setItem('cart', JSON.stringify(state.cartProducts))
    },
    // Add a product with a specific quantity to cart products and set in local storage
    addSingleProductToCart: (state, action) => {

      const { id: idProduct, quantity } = action.payload

      const findProduct = state.cartProducts.find(elem => elem.id === idProduct)

      if(findProduct === undefined){
        state.cartProducts = [ ...state.cartProducts, { ...action.payload, quantity: quantity }]
      } else {
        state.cartProducts = quantityProduct(state.cartProducts, idProduct, quantity)
      }

      localStorage.setItem('cart', JSON.stringify(state.cartProducts))
    }
  },
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
          state.products = newProducts(action.payload, state.favoriteProducts, state.cartProducts)
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
          state.products = newProducts(action.payload, state.favoriteProducts, state.cartProducts)
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

export const { 
  addFavorite, 
  resetCart,
  deleteProductCart,
  addSingleProductToCart 
} = productsSlice.actions

export const selectFavoritesProducts = (state) => state.products.favoriteProducts;

export const selectCartProducts = (state) => state.products.cartProducts;

export const selectSingleProduct = (state) => state.products.singleProduct;

export const selectAllProducts = (state) => state.products.products;

export const selectStatus = (state) => state.products.status;

export const showError = (state) => state.products.error;

export default productsSlice.reducer
