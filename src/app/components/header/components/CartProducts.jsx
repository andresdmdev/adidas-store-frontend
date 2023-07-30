import { useDispatch, useSelector } from "react-redux"
import { resetCart, selectCartProducts } from "../../../../services/slices/productsSlice"
import '../styles/cartStyles.css'
import CloseBtn from "./CloseBtn"
import { useState } from "react"
import starEmogi from '../../../../assets/star-emogi.svg'
import { addProductToShoppings } from "../../../../services/slices/shoppingSlice"
import dataTicket from "../../../helpers/dataTicket"
import CartProductItem from "./CartProductItem"

export default function CartProducts({ handleCloseBtn }) {

  const [showCheckOutMsg, setShowCheckOutMsg] = useState(false)

  const data = useSelector(selectCartProducts)

  const dispatch = useDispatch()

  const handleCheckOut = () => {
    dispatch(addProductToShoppings(dataTicket(data)))
    dispatch(resetCart())
    setShowCheckOutMsg(showCheckOutMsg => !showCheckOutMsg)
  }

  return (
    <div className="cart-container">
      <div className="cart-heading">
        <h2>Cart</h2>
        <CloseBtn handleClick={handleCloseBtn}  />
      </div>
      <div className="cart-line"></div>
      {
        showCheckOutMsg && data.length === 0
        ?
        <div className="checkout-section" data-testid='shopping'>
          <img src={starEmogi} alt="liked-images" width={50} height={50} />
          <span className="thanks">Thanks for view my project, I hope that you liked it.</span>
          <span className="next-time">See you next time</span>
        </div>
        :
        data.length > 0 && <CartProductItem data={data} />
      }
      {
        data.length !== 0 && !showCheckOutMsg
        ?
        <button className='cart-checkout-button' name='profile' aria-label='profile' onClick={handleCheckOut} data-testid="checkout">
          Checkout
        </button>
        :
        !showCheckOutMsg && <span className="cart-empty-msg" data-testid="emptyCart">Your cart is empty.</span>
      }
    </div>
  )
}