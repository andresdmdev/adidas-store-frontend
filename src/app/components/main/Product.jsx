import React from "react";
import { useDispatch } from "react-redux";
import './styles/product.css'
import cart from '../../../assets/cart-ligth.svg'
import cartDark from '../../../assets/cart.svg'
import heart from '../../../assets/heart.svg'
import loved from '../../../assets/loved.svg'
import currency from "../../helpers/calcCurrency";
import { useNavigate } from "react-router-dom";
import { changeOption } from "../../../services/slices/validationSlice";
import { addFavorite, addProductToCart, deleteProductCart } from "../../../services/slices/productsSlice";

const Product = React.memo(function Product({ product }){

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleClickCart(){
    if(product.quantity > 0){
      dispatch(deleteProductCart(product))
    } else {
      dispatch(addProductToCart(product))
    }
  }

  function handleClickFav(){
    dispatch(addFavorite(product))
  }

  const newPrice = product.price * (1 - product.discount/100)

  function handleSingleProduct(){
    dispatch(changeOption('product'))
    navigate(`/product/${product.id}`, {replace: true})
  }

  return (
    <article className="product_card">
      <div className="product_card_img"  onClick={handleSingleProduct}>
        <img src={product.image1} alt="photo" className="product_card_img_photo" />
        <div>
          {
            product.discount > 0 &&
            <div className="product_card_extra_discount">-{product.discount}%</div>
          }
        </div>
      </div>
      <div className="product_card_info">
        <h5 className="product_card_info_name" onClick={handleSingleProduct}>{product.name}</h5>
        <p className={`product_card_info_category ${product.discount === 0 && 'e'}`}>{product.breadcrumbs}</p>
        <div className={`product_card_info_extra ${product.discount === 0 && 'movil'}`}>
          <div className="product_card_info_extra_block">
            {
              product.discount > 0 &&
              <p className="product_card_info_extra_discount">{currency(product.price)}</p>
            }
            <p className={`product_card_info_extra_price ${product.discount === 0 && 'e'}`}>{currency(newPrice)}</p>
          </div>
          <div className="product_card_info_extra_icons" >
            <img 
              src={!product.favorite ? heart : loved} 
              alt="favorite" 
              className="product_card_info_extra_icons_heart" 
              onClick={handleClickFav}
            />
            <img 
              src={product.quantity > 0 ? cartDark : cart} 
              alt="cart" 
              className="product_card_info_extra_icons_shop"
              onClick={handleClickCart}
            />
          </div>
        </div>
      </div>
    </article>
  )
})

export default Product