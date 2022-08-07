
export default function newProducts(action, favorites, cart){
  
	return action.map(product => {
    
    const findProduct = favorites.find(elem => elem.id === product.id)
    const cartProduct = cart.find(elem => elem.id === product.id)
    
    if(findProduct && cartProduct){
      return { ...product, favorite: findProduct.favorite, quantity: cartProduct.quantity }
    }	else if(findProduct){

      return { ...product, favorite:	findProduct.favorite, quantity: 0 }
    } else if(cartProduct){

      return { ...product,	favorite:	false, quantity: cartProduct.quantity }
    } else {
      
      return {	...product, favorite: false, quantity: 0	}
    }
  })
}