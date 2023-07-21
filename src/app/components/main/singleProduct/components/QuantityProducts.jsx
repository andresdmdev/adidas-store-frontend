import { useState } from "react"
import minutBtn from '../../../../../assets/minus-btn.svg'
import plusBtn from '../../../../../assets/plus-btn.svg'
import cartWhite from '../../../../../assets/cart-white.svg'
import { useDispatch } from "react-redux"
import { addSingleProductToCart } from "../../../../../services/slices/productsSlice"
import { useNavigate } from "react-router-dom"
import { section } from "../../../../../services/slices/validationSlice"

export default function QuantityProducts({ product }) {

  const [productCounter, setProductCounter] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlePlusProductCounter = () => {
    if(productCounter < 99) {
      setProductCounter(productCounter => productCounter + 1)
    }
  }

  const handleMinusProductCounter = () => {
    if(productCounter > 1) {
      setProductCounter(productCounter => productCounter - 1)
    }
  }

  function handleBuy(){
      dispatch(addSingleProductToCart({ ...product, quantity: productCounter}))
      dispatch(section(''))
      navigate('/', {replace:true})
  } 

  return (
    <>
      <div className="product-quantity">
        <button name='minusBtn' aria-label='minusBtn' onClick={handleMinusProductCounter}>
          <img src={minutBtn} alt="minus" width={60} height={56} />
        </button>
        <span>{productCounter}</span>
        <button name='plusBtn' aria-label='plusBtn' onClick={handlePlusProductCounter}>
          <img src={plusBtn} alt="plus" width={60} height={56} />
        </button>
      </div>
      <button className="product-cart" name='addToCartBtn' aria-label='addToCartBtn' onClick={handleBuy}>
        <img src={cartWhite} alt="cart" width={17.5} height={16} />
        <span>Add to cart</span>
      </button>
    </>
  )
}