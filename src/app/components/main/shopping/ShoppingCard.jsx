import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import './styles/shoppingStyles.css'
import currency from '../../../helpers/calcCurrency'

export default function ShoppingCard({ product }){
  return (
    <div className='shopping_card'>
      <div className="shopping_card_block">
        <p className="shopping_card_quantity">
          <strong>Quantity:</strong> {product.quantity} products
        </p>
        <div className="shopping_card_products">
          <strong>Products:</strong>
          <div className="shopping_card_products_label">
              <div className="shopping_card_products_ticker_name"><strong>Name</strong></div>
              <div className="shopping_card_products_ticker"><strong>Quantity</strong></div>
              <div className="shopping_card_products_ticker"><strong>SubTotal</strong></div>
          </div>
          <div className="shopping_card_products_items">
            {
              product.productNames
                .map(elem => (
                  <div key={nanoid()} className='shopping_card_info'>
                    <div className='shopping_card_info_name'>
                      {elem.name}
                    </div>
                    <div className='shopping_card_info_quantity'>
                      {elem.quantity}
                    </div>
                    <div className='shopping_card_info_price'>
                      {currency((elem.price * elem.quantity * (1 - elem.discount/100)))}
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="shopping_card_section">
          <p className="shopping_card_date"><strong>Purchase date:</strong> {product.date}</p>
          <p className="shopping_card_amount"><strong>Total amount:</strong> {currency(product.amount)}</p>
        </div>
      </div>
    </div>
  )
}