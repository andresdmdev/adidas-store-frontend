import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleProductToCart } from "../../../../services/slices/cartSlice";
import { selectSingleProduct } from "../../../../services/slices/productsSlice";
import currency from "../../../helpers/calcCurrency";
import './styles/singleProduct.css'

export default function SingleProduct(){

  const [quantity, setQuantity] = useState(1)
  
  const product = useSelector(selectSingleProduct)

  const dispatch = useDispatch()

  function handleMinus(){
    setQuantity(prevState => prevState - 1)

  }

  function handlePlus(){
    setQuantity(prevState => prevState + 1)
  }

  function handleBuy(){
    dispatch(addSingleProductToCart({ ...product, quantity: quantity}))
  }
  
  return (
    <div className="product_container">
      <img src={product.image1} alt="product" width='300px' className="product_photo" />
      <div className="product_info">
        <div className="product_block_top">
          <div className="product_name">{product.name}</div>
          <div className="product_values">
            {
              product.discount > 0 &&
              <div className="product_discount">-{product.discount}% OFF</div>
            }
            <div className="product_price">
              {
                product.discount > 0 &&
                <p className="product_price_dicount">{(currency(product.price))}</p>
              }
              <p className="product_price_total">{currency(product.price * (1 - product.discount/100))}</p>
            </div>
          </div>
        </div>
        <div className="product_description">
          <p className="product_description_title">Description</p>
          <p className="product_description_text">{product.description}</p>
        </div>
        <div className="product_details">
          <div className="product_color">Color: {product.color}</div>
          <div className="product_size">Size: XXX</div>
          <div className="product_stats">{product.brand} {product.averageRating}</div>
        </div>
        <div className="product_actions">
          <div className="product_actions_quantity">
            Quantity:
            <div className="product_actions_quantity_btn" onClick={handleMinus} style={{ pointerEvents: quantity === 1 ? 'none' : '' }}>-</div>
              {quantity}
            <div className="product_actions_quantity_btn" onClick={handlePlus} style={{ pointerEvents: quantity === 100 ? 'none' : '' }}>+</div>
          </div>
          <div className="product_actions_btn" onClick={handleBuy}>Add to cart</div>
        </div>
      </div>
    </div>
  )
}