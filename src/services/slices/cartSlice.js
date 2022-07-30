import { createSlice } from "@reduxjs/toolkit";

// It gets cart products from local storage if They are
const initialState = {
  cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a product with quantity to cart products and set in local storage
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
    // Reset cart products to cero and set in local storage
    resetCart: (state, action) => {
      state.cartProducts = []

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
    },
    // Delet a product in cart products and set in local storage
    deleteProductCart: (state, action) => {

      const idProduct = action.payload.id

      state.cartProducts = state.cartProducts.filter(product => product.id !== idProduct)

      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts))
    },
    // Delete a quantity of a product in cart products and set in local storage
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
    // Add a product with a specific quantity to cart products and set in local storage
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