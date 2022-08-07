import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../../../services/slices/productsSlice";
import ProductCart from "./ProductCart";
import './styles/cartProduct.css'
import Ticket from "./Ticket";

export default function CartProducts(){

  const [showTicket, setShowTicket] = useState(false)

  const data = useSelector(selectCartProducts)

  const products = data.map(product => (
    <ProductCart 
      product={product} 
      key={product.id} 
    />
  ))

  function handleClick(){
    if(products.length > 0){
      setShowTicket(prevState => !prevState)
    }
  }

  function handleTicket(){
    setShowTicket(prevState => !prevState)
  }

  return (
    <>
      <h1 className="products_title">Cart</h1>
      <div
        className={`products_cart_btn ${products.length > 0 && 'e'}`}
        onClick={handleClick}
      >
      Make order
      </div>
      <div className="products_cart">
        {
          products.length === 0 ? 
          <p>Add products to cart</p> :
          products
        }
      </div>
      {
        showTicket && 
        <Ticket 
          products={data} 
          showTicket={handleTicket} 
        />
      }
    </>
  )
}