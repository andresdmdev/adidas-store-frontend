import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../slices/productsSlice'
import categoryReducer from '../slices/categorySlice'
import validationReducer from '../slices/validationSlice'
import cartReducer from '../slices/cartSlice'
import favoriteReducer from '../slices/favoriteSlice'
import shoppinsReducer from '../slices/shoppinsSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
    validation: validationReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    shoppings: shoppinsReducer
  }
})