import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from '../slices/productsSlice'
import validationReducer from '../slices/validationSlice'
import shoppinsReducer from '../slices/shoppingSlice'

const rootReducer = combineReducers({
  products: productsReducer,
  validation: validationReducer,
  shoppings: shoppinsReducer
})

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
} 