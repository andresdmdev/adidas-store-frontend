import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOption } from "../../../services/slices/validationSlice";
import cartLigth from '../../../assets/cart-ligth.svg';
import cartDark from '../../../assets/cart-dark.svg';
import { selectAllCartproducts } from "../../../services/slices/cartSlice";
import { saveCategory } from "../../../services/slices/categorySlice";

export default function Cart(){

  const dispatch = useDispatch()

  function handleClick(){
    dispatch(saveCategory(''))
    dispatch(changeOption('Cart'))
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