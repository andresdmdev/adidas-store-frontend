export default function dataTicket(products){
  
  const quantity = 
    products
      .map(elem => elem.quantity)
      .reduce((acc, curr) => acc + curr, 0)

  const amount = 
    products
      .map(elem => {
        return elem.discount > 0 ? 
          (elem.price * (1 - elem.discount / 100)) * elem.quantity : 
          elem.price * elem.quantity
      })
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2)

  const date = new Date()
  const dateBought = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`

  const name = products.map(elem => (
    { name: elem.name, quantity: elem.quantity, price: elem.price, discount: elem.discount }
  ))
  
  return {
    productNames: name,
    quantity: quantity,
    date: dateBought,
    amount: amount
  }
}