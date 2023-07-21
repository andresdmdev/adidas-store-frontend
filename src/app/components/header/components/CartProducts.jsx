import { useDispatch, useSelector } from "react-redux"
import { deleteProductCart, resetCart, selectCartProducts } from "../../../../services/slices/productsSlice"
import '../styles/cartStyles.css'
import trashIcon from '../../../../assets/trash.svg'
import currency from "../../../helpers/calcCurrency"
import CloseBtn from "./CloseBtn"
import { useNavigate } from "react-router-dom"
import { section } from "../../../../services/slices/validationSlice"
import { useState } from "react"
import starEmogi from '../../../../assets/star-emogi.svg'
import { addProductToShoppings } from "../../../../services/slices/shoppinsSlice"
import dataTicket from "../../../helpers/dataTicket"

export default function CartProducts({ handleCloseBtn }) {

  const [showCheckOutMsg, setShowCheckOutMsg] = useState(false)

  const data = useSelector(selectCartProducts)

  const dispatch = useDispatch()

  const navigation = useNavigate()

  const handleDeleteProductCart = (e, id) => {
    e.stopPropagation()
    dispatch(deleteProductCart(id))
  }

  const calculatePrice = (product, quantity = 1) => {
    return currency((product.price - (product.price * (product.discount/100))) * quantity)
  }

  const handleNavigationToSingleProductPage = (e, id) => {
    e.stopPropagation()
    navigation(`/product/${id}`, { replace: true })
    dispatch(section(''))
  }

  const handleCheckOut = () => {
    dispatch(addProductToShoppings(dataTicket(data)))
    dispatch(resetCart())
    setShowCheckOutMsg(showCheckOutMsg => !showCheckOutMsg)
  }

  const products = data.map(elem => (
    <article key={elem.id} onClick={(e) => handleNavigationToSingleProductPage(e, elem.id)}>
      <img src={elem.image1} alt="product-cart" className="product-cart-photo" width={50} height={50} />
      <div className="product-cart-details">
        <span className="product-cart-name">{elem.name}</span>
        <div className="product-cart-info">
          <span className="product-cart-price">{calculatePrice(elem)} </span>
          <span className="product-cart-quantity">X {elem.quantity} = </span>
          <span className="product-cart-total">{calculatePrice(elem, elem.quantity)}</span>
        </div>
      </div>
      <button className="trash-container" name='trash' aria-label='trash' onClick={(e) => handleDeleteProductCart(e, elem.id)}>
        <img src={trashIcon} alt="product-cart" width={14} height={16} />
      </button>
    </article>
  ))

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
        <div className="checkout-section">
          <img src={starEmogi} alt="liked-images" width={50} height={50} />
          <span className="thanks">Thanks for view my project, I hope that you liked it.</span>
          <span className="next-time">See you next time</span>
        </div>
        :
        data.length > 0 && <div className="cart-products">{products}</div>
      }
      {
        data.length !== 0 && !showCheckOutMsg
        ?
        <button className='cart-checkout-button' name='profile' aria-label='profile' onClick={handleCheckOut}>
          Checkout
        </button>
        :
        !showCheckOutMsg && <span className="cart-empty-msg">Your cart is empty.</span>
      }
    </div>
  )
}