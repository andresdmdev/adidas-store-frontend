import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCart, deleteProductCart, deleteQuantityProduct } from "../../../../services/slices/cartSlice";
import './styles/cartProduct.css'
import trash from '../../../../assets/trash.svg'
import currency from "../../../helpers/calcCurrency";

export default function ProductCart({ product }){

  const dispatch = useDispatch()

  function handleClickDeleteCart(){
    dispatch(deleteProductCart(product))
  }

  function handleClickPlus(){
    dispatch(addProductToCart(product))
  }

  function handleClickMinus(){
    if(product.quantity > 1){
      dispatch(deleteQuantityProduct(product))
    }
  }

  const price = currency(product.price * product.quantity) 

  return (
    <div className="product_cart_card">
      <div className="product_cart_card_img">
        <img src={product.image1} alt="s" className="product_cart_card_img_photo" />
        <div className="product_cart_card_extra">
          {
            product.discount !== 0 && 
            <div className="product_cart_card_extra_discount">{product.discount}% off</div>
          }
        </div>
      </div>
      <div className="product_cart_card_info">
        <div className="product_cart_card_info_section_a">
          <h5 className="product_cart_card_info_section_a_name">{product.name}</h5>
          <p className="product_cart_card_info_section_a_category">{product.breadcrumbs}</p>
          <div className="product_cart_card_info_section_a_quantity">
            Quantity: 
            <div className="product_cart_card_info_section_a_quantity_btn" onClick={handleClickMinus}>-</div>
            {product.quantity}
            <div className="product_cart_card_info_section_a_quantity_btn" onClick={handleClickPlus}>+</div>
          </div>
          {/* <p className="product_cart_card_info_size">Size: {product.size}</p> */}
          <div className="product_cart_card_info_section_a_color">
            Color: {product.color}
          </div>
        </div>
        <div className="product_cart_card_info_section_b">
          <div className="product_cart_card_info_section_b_block">
            {
              product.discount > 0 &&
              <p className="product_cart_card_info_section_b_discount">{price}</p>
            }
            <p className="product_cart_card_info_section_b_price">{currency((product.price * (1 - product.discount/100) * product.quantity))}</p>
          </div>
          <img 
            className="product_cart_card_info_section_b_delete" 
            onClick={handleClickDeleteCart}
            src={trash}
            alt='trash'
          />
        </div>
      </div>
    </div>
  )
}