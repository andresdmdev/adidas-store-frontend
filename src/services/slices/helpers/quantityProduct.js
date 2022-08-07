export default function quantityProduct(state, idProduct, value){

  const quantity = (quantity) => {

    if(value > 1){
      return value
    } else if(value === 1){
      return quantity + value
    } else {
      return quantity === 0 ? 0 : quantity + value
    }
  }

  return state.map(elem => {
    
    if(elem.id === idProduct){
      return { ...elem, quantity: value === 0 ? 0 : quantity(elem.quantity) }
    } else {
      return elem
    }
  })
}