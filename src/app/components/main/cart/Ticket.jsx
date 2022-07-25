import React from "react";
import { useDispatch } from "react-redux";
import { addProductToShoppings } from "../../../../services/slices/shoppinsSlice";
import './styles/cartProduct.css'
import close from '../../../../assets/close.svg'
import { useState } from "react";
import MsgCart from "./MsgCart";

export default function Ticket({ products, showTicket }){

  const [showMsg, setShowMsg] = useState(false)

  const quantity = 
    products
      .map(elem => elem.quantity)
      .reduce((acc, curr) => acc + curr, 0)

  const currency = function(number){
    return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
  };

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

  const newData = {
    productNames: name,
    quantity: quantity,
    date: dateBought,
    amount: amount
  }

  const dispatch = useDispatch()

  function handleBuyClick(){
    dispatch(addProductToShoppings(newData))

    setShowMsg(true)
  }

  const productName = products.map(elem => 
    <div 
      key={elem.id}
      className='ticket_info_products_items_p'
    >
      <div className='ticket_info_products_items_p-name'>
        {elem.name}
      </div>
      <div className='ticket_info_products_items_p-quantity'>
        {elem.quantity}
      </div>
      <div className='ticket_info_products_items_p-price'>
        {currency((elem.price * elem.quantity * (1 - elem.discount/100)).toFixed(2))}
      </div>
    </div>
  )
  

  return (
    <div className="ticket">
      <div
        className="ticket_close"
        onClick={showTicket}
        style={{ pointerEvents: showMsg ? 'none' : 'auto' }}
      >
      <img src={close} alt="close" className="ticket_close_icon" />
      </div>
      <div className="ticket_info">
        <div className="ticket_info_block">
          <div className="ticket_info_quantity">
            <strong>Quantity: </strong> {quantity} products
          </div>
          <h5 className="ticket_info_date"><strong>Date: </strong> {dateBought}</h5>
        </div>
        <div className="ticket_info_products">
          <h2 className="ticket_info_products_title">
            Products:
          </h2>
          <div className="ticket_info_products_items">
            <div className="ticket_info_products_items_label">
              <div className="ticket_info_products_items_label_ticker">Name</div>
              <div className="ticket_info_products_items_label_ticker">Quantity</div>
              <div className="ticket_info_products_items_label_ticker">SubTotal</div>
            </div>
            <div className="ticket_info_products_items_block">
              {productName}
            </div>
          </div>
        </div>
        <h4 className="ticket_info_amount"><strong>Total Amount:</strong> ${amount}</h4>
        <div className="ticket_info_block_btn">
          <div 
            onClick={handleBuyClick}
            className='ticket_info_btn'
            style={{ pointerEvents: showMsg ? 'none' : 'auto' }}
          >Buy</div>
        </div>
      </div>
      { showMsg && <MsgCart showTicket={showTicket} /> }
    </div>
  )
}