import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import trashIcon from '../../../../assets/trash.svg'
import currency from "../../../helpers/calcCurrency"
import { section } from "../../../../services/slices/validationSlice"
import { deleteProductCart } from "../../../../services/slices/productsSlice"

export default function CartProductItem({ data }) {

  const dispatch = useDispatch()
  const navigation = useNavigate()

  const handleNavigationToSingleProductPage = (e, id) => {
    e.stopPropagation()
    navigation(`/product/${id}`, { replace: true })
    dispatch(section(''))
  }

  const handleDeleteProductCart = (e, id) => {
    e.stopPropagation()
    dispatch(deleteProductCart(id))
  }

  const calculatePrice = (product, quantity = 1) => {
    return currency((product.price - (product.price * (product.discount/100))) * quantity)
  }

  const cartProducts = data.map(product => (
    <article key={product.id} onClick={(e) => handleNavigationToSingleProductPage(e, product.id)}>
      <img src={product.image1} alt="product-cart-photo" className="product-cart-photo" width={50} height={50} />
      <div className="product-cart-details">
        <span className="product-cart-name">{product.name}</span>
        <div className="product-cart-info">
          <span className="product-cart-price">{calculatePrice(product)} </span>
          <span className="product-cart-quantity">X {product.quantity} = </span>
          <span className="product-cart-total">{calculatePrice(product, product.quantity)}</span>
        </div>
      </div>
      <button className="trash-container" name='trash' aria-label='trash' onClick={(e) => handleDeleteProductCart(e, product.id)}>
        <img src={trashIcon} alt="trash-product-cart" width={14} height={16} />
      </button>
    </article>
  ))

  return (
    <div className="cart-products" data-testid="cartProducts">
      {cartProducts}
    </div>
  )
}