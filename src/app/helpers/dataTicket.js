export default function dataTicket(products){

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

  const randomNumber = Math.floor(Math.random() * 100)

  const dateBought = `${date.getMonth()}${date.getDate()}${date.getFullYear()}${randomNumber}`

  return {
    ticket: dateBought,
    amount: amount
  }
}