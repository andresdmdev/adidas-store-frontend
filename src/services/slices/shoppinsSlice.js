import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppings: JSON.parse(localStorage.getItem('shoppings')) || [],
}

const shoppingsSlice = createSlice({
  name: 'shoppings',
  initialState,
  reducers: {
    addProductToShoppings: (state, action) => {

      state.shoppings.unshift(action.payload)

      localStorage.setItem('shoppings', JSON.stringify(state.shoppings))
    }
  }
})

export const { addProductToShoppings } = shoppingsSlice.actions

export const selectAllShoppings = (state) => state.shoppings.shoppings

export default shoppingsSlice.reducer