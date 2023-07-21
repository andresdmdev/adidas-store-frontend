import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  section: '',
}

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    section: (state, action) => {
      state.section = action.payload
    }
  }
})

export const { 
  section, 
} = validationSlice.actions

export const selectSection = (state) => state.validation.section

export default validationSlice.reducer