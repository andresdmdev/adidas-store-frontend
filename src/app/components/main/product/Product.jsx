import React from "react";
import './styles/products.css'
import noPhoto from  '../../../../assets/no-photo.svg'
import currency from "../../../helpers/calcCurrency";
import { useNavigate } from "react-router-dom";
import FavoriteComponent from "./components/FavoriteComponent";
import { useDispatch } from "react-redux";
import { section } from "../../../../services/slices/validationSlice";

const Product = React.memo(function Product({ product }){

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const newPrice = product.price * (1 - product.discount/100)

  function handleSingleProduct(){
    dispatch(section(''))
    navigate(`/product/${product.id}`, {replace: true})
  }

  return (
    <article className="product-card" onClick={handleSingleProduct}>
      <div className="product-card-img">
      <img src={product.image1 ? product.image1 : noPhoto} alt="photo" className="img-photo" width={157} height={168} />
        <FavoriteComponent product={product} fillBtn="img-fav-icon-fill" outLineBtn="img-fav-icon" name="fav-icon--fill" classBtn="product-fav-icon" />
        {
          product.discount > 0 &&
          <div className="img-discount">
            <i>{product.discount}%</i>
          </div>
        }
      </div>
      <div className="product-card-details">
        <span className="product-card-name">{product.name}</span>
        <div className="product-card-section">
          <span className="product-card-price">{currency(newPrice)}</span>
          {
            product.discount > 0 &&
            <span className="product-card-discount">{currency(product.price)}</span>
          }
        </div>
      </div>
    </article>
  )
})

export default Product