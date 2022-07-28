import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOption } from "../../../services/slices/validationSlice";
import cartLigth from '../../../assets/cart-ligth.svg';
import cartDark from '../../../assets/cart-dark.svg';
import { selectAllCartproducts } from "../../../services/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart(){

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleClick(){
    dispatch(changeOption('cart'))
    navigate('/adidas-store-frontend/cart', {replace:true})
  }

  const verifyCart = useSelector(selectAllCartproducts)

  const cartImg = verifyCart.length > 0 ? cartDark : cartLigth

  return(
    <div
      onClick={handleClick}
      className='section_header_cart'
    >
      <img 
        src={cartImg} 
        alt="cart" 
        className="section_header_cart_img"
      />
      Cart
    </div>
  )
}