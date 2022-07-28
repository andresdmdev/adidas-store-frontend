import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, deleteProductCart, selectAllCartproducts } from "../../../services/slices/cartSlice";
import { addProductToFavorites, selectAllFavorites } from "../../../services/slices/favoriteSlice";
import './styles/product.css'
import cart from '../../../assets/cart-ligth.svg'
import cartDark from '../../../assets/cart.svg'
import heart from '../../../assets/heart.svg'
import loved from '../../../assets/loved.svg'
import currency from "../../helpers/calcCurrency";
import { changeOption, singleProduct } from "../../../services/slices/validationSlice";
import { useNavigate } from "react-router-dom";

export default function Product({ product }){

  const dispatch = useDispatch()

  const favProducts = useSelector(selectAllFavorites)

  const cartProducts = useSelector(selectAllCartproducts)

  const navigate = useNavigate()

  let favorite = false

  const fav = 
    favProducts
      .map(elem => {
        if(elem.id === product.id){
          favorite = elem.favorite
        }
      })

  let quantity

  const quantityProduct = 
    cartProducts
      .map(elem => {
        if(elem.id === product.id){
          quantity = elem.quantity
        }
      })

  function handleClickCart(){
    if(quantity > 0){
      dispatch(deleteProductCart(product))
    } else {
      dispatch(addProductToCart(product))
    }
  }

  function handleClickFav(){
    dispatch(addProductToFavorites(product))
  }

  const newPrice = product.price * (1 - product.discount/100)

  function handleSingleProduct(){
    dispatch(changeOption('product'))

    navigate(`/product/${product.id}`, {replace: true})

    dispatch(singleProduct())
  }

  return (
    <div className="product_card">
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
        <p className={`product_card_info_category ${product.discount === 0 ? 'e' : ''}`}>{product.breadcrumbs}</p>
        <div className={`product_card_info_extra ${product.discount === 0 && 'movil'}`}>
          <div className="product_card_info_extra_block">
            {
              product.discount > 0 &&
              <p className="product_card_info_extra_discount">{currency(product.price)}</p>
            }
            <p className='product_card_info_extra_price'>{currency(newPrice)}</p>
          </div>
          <div className="product_card_info_extra_icons" >
            <img 
              src={favorite === false ? heart : loved} 
              alt="favorite" 
              className="product_card_info_extra_icons_heart" 
              onClick={handleClickFav}
            />
            <img 
              src={quantity > 0 ? cartDark : cart} 
              alt="cart" 
              className="product_card_info_extra_icons_shop"
              onClick={handleClickCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}