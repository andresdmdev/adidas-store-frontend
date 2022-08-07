import React from "react";
import currency from "../../../helpers/calcCurrency";

export default function ListProducts({ product }){

  const totalPrice = currency((product.price * product.quantity * (1 - product.discount/100)).toFixed(2))

  return (
    <div 
      className='ticket_info_products_items_p'
    >
      <div className='ticket_info_products_items_p-name'>
        {product.name}
      </div>
      <div className='ticket_info_products_items_p-quantity'>
        {product.quantity}
      </div>
      <div className='ticket_info_products_items_p-price'>
        {totalPrice}
      </div>
      <hr />
    </div>
  )
}