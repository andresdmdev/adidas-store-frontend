import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://api-store-adidas.herokuapp.com/api/products'

const initialState = {
  category: '',
  categories: [],
}

export const getAllCategoriesProducts = createAsyncThunk("categories/getAllCategoriesProducts", async () => {
  try {
    const res = await axios.get(URL)
    return [...res.data]
  } catch (error) {
    return error.message
  }
})

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    saveCategory: (state, action) => {
      state.category = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCategoriesProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllCategoriesProducts.fulfilled, (state, action) => {
        state.status = 'success'
        
        state.categories = 
          action.payload
            .map(elem => elem.breadcrumbs)
            .filter((elem, index, array) => {
              return index === array.indexOf(elem)
            })
            .sort((a, b) => b.localeCompare(a))
      })
      .addCase(getAllCategoriesProducts.rejected, (state, action) => {
        state.status = 'rejected'
      })
  }
})

export const { saveCategory } = categorySlice.actions

export const selectCategory = (state) => state.categories.category;
export const allCategories = (state) => state.categories.categories;
 
export default categorySlice.reducer