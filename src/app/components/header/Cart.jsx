import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOption } from "../../../services/slices/validationSlice";
import cartLigth from '../../../assets/cart-ligth.svg';
import cartDark from '../../../assets/cart-dark.svg';
import { useNavigate } from "react-router-dom";
import { selectCartProducts } from "../../../services/slices/productsSlice";

export default function Cart(){

  const verifyCart = useSelector(selectCartProducts)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleClick(){
    dispatch(changeOption('cart'))
    navigate('/cart', {replace:true})
  }

  return(
    <div
      onClick={handleClick}
      className='section_header_cart'
    >
      <img 
        src={verifyCart.length > 0 ? cartDark : cartLigth} 
        alt="cart" 
        className="section_header_cart_img"
      />
      Cart
    </div>
  )
}