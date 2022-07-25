import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, deleteProductCart, selectAllCartproducts } from "../../../services/slices/cartSlice";
import { addProductToFavorites, selectAllFavorites } from "../../../services/slices/favoriteSlice";
import './styles/product.css'
import cart from '../../../assets/cart-ligth.svg'
import cartDark from '../../../assets/cart.svg'
import heart from '../../../assets/heart.svg'
import loved from '../../../assets/loved.svg'
import currency from "../../helpers/calcCurrency";

export default function Product({ product }){

  const dispatch = useDispatch()

  const favProducts = useSelector(selectAllFavorites)

  const cartProducts = useSelector(selectAllCartproducts)

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

  return (
    <div className="product_card">
      <div className="product_card_img">
        <img src={product.image1} alt="photo" className="product_card_img_photo" />
        <div>
          {
            product.discount > 0 &&
            <div className="product_card_extra_discount">-{product.discount}%</div>
          }
        </div>
      </div>
      <div className="product_card_info">
        <h5 className="product_card_info_name">{product.name}</h5>
        <p className={`product_card_info_category ${product.discount === 0 ? 'e' : ''}`}>{product.breadcrumbs}</p>
        <div className="product_card_info_extra">
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