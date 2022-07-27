import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  option: 'home'
}

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    changeOption: (state, action) => {
      state.option = action.payload
    }
  }
})

export const { changeOption } = validationSlice.actions

export const selectOption = (state) => state.validation.option

export default validationSlice.reducer