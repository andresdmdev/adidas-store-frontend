import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {

      const idProduct = action.payload.id

      const findProduct = state.cartProducts.find(elem => elem.id === idProduct)

      if(findProduct === undefined){
        state.cartProducts.push({ ...action.payload, quantity: 1 })
      } else {
        state.cartProducts = state.cartProducts.map(elem => {
          if(idProduct === elem.id){
            return { ...elem, quantity: elem.quantity + 1  }
          } else{
            return { ...elem, quantity: elem.quantity }
          }
        })
      }

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
    },
    resetCart: (state, action) => {
      state.cartProducts = []

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
    },
    deleteProductCart: (state, action) => {

      const idProduct = action.payload.id

      state.cartProducts = state.cartProducts.filter(product => product.id !== idProduct)

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
    },
    deleteQuantityProduct: (state, action) => {

      const idProduct = action.payload.id

      if(state.cartProducts.length > 0){

        state.cartProducts = state.cartProducts.map(elem => {
          if(idProduct === elem.id){
            return { ...elem, quantity: elem.quantity === 0 ? elem.quantity : elem.quantity - 1  }
          } else{
            return { ...elem, quantity: elem.quantity }
          }
        })
      }

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
    },
    addSingleProductToCart: (state, action) => {

      const { id: idProduct, quantity } = action.payload

      const findProduct = state.cartProducts.find(elem => elem.id === idProduct)

      if(findProduct === undefined){
        state.cartProducts.push({ ...action.payload, quantity: quantity })
      } else {
        state.cartProducts = state.cartProducts.map(elem => {
          if(idProduct === elem.id){
            return { ...elem, quantity: quantity  }
          } else{
            return { ...elem, quantity: elem.quantity }
          }
        })
      }

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
    }
  }
})

export const { 
    addProductToCart, 
    resetCart, 
    deleteProductCart,
    deleteQuantityProduct,
    addSingleProductToCart
} = cartSlice.actions

export const selectAllCartproducts = (state) => state.cart.cartProducts

export default cartSlice.reducer