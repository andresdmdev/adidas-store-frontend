import { createSlice } from "@reduxjs/toolkit";

// It gets shoppings history from local storage if They are
const initialState = {
  shoppings: JSON.parse(localStorage.getItem('shoppings')) || [],
}

const shoppingsSlice = createSlice({
  name: 'shoppings',
  initialState,
  reducers: {
    // Add a shopping info and set local storage
    addProductToShoppings: (state, action) => {

      state.shoppings.unshift(action.payload)

      localStorage.setItem('shoppings', JSON.stringify(state.shoppings))
    }
  }
})

export const { addProductToShoppings } = shoppingsSlice.actions

export const selectAllShoppings = (state) => state.shoppings.shoppings

export default shoppingsSlice.reducer