import React from "react";
import { useDispatch } from "react-redux";
import { addProductToShoppings } from "../../../../services/slices/shoppinsSlice";
import './styles/cartProduct.css'
import close from '../../../../assets/close.svg'
import { useState } from "react";
import MsgCart from "./MsgCart";
import { resetCart } from "../../../../services/slices/productsSlice";
import dataTicket from "../../../helpers/dataTicket";
import ListProducts from "./ListProducts";

export default function Ticket({ products, showTicket }){

  const [showMsg, setShowMsg] = useState(false)

  const dispatch = useDispatch()

  const newData = dataTicket(products)

  function handleBuyClick(){
    dispatch(addProductToShoppings(newData))

    dispatch(resetCart())

    setShowMsg(true)
  }

  const productName = products.map(elem => 
    <ListProducts key={elem.id} product={elem} />
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
            <strong>Quantity: </strong> {newData.quantity} products
          </div>
          <h5 className="ticket_info_date"><strong>Date: </strong> {newData.date}</h5>
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
        <h4 className="ticket_info_amount"><strong>Total Amount:</strong> ${newData.amount}</h4>
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