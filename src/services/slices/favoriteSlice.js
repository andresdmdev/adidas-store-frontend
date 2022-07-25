import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProductToFavorites: (state, action) => {

      const idProduct = action.payload.id

      if(state.favorites.length !== 0){

        const findProduct = state.favorites.find(elem => elem.id === idProduct)

        if(findProduct === undefined){
          
          state.favorites.push({ ...action.payload, favorite: true })
        } else {

          state.favorites = state.favorites.filter(elem => elem.id !== idProduct)
        }
      } else {
        state.favorites.push({ ...action.payload, favorite: true })
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }
  }
})

export const { addProductToFavorites } = favoriteSlice.actions

export const selectAllFavorites = (state) => state.favorites.favorites

export default favoriteSlice.reducer