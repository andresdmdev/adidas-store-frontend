import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: 'home',
  menuMovil: false,
  singleProduct: false
}

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    changeOption: (state, action) => {
      state.option = action.payload
    },
    menuMovil: (state, action) => {
      state.menuMovil = !state.menuMovil
    },
    singleProduct: (state, action) => {
      state.singleProduct = action.payload
    }
  }
})

export const { 
  changeOption, 
  menuMovil, 
  singleProduct 
} = validationSlice.actions

export const selectOption = (state) => state.validation.option

export const selectMenuMovil = (state) => state.validation.menuMovil

export const selectShowSingleProduct = (state) => state.validation.singleProduct

export default validationSlice.reducer