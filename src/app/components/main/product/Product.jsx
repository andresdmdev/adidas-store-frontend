import React from "react";
import './styles/products.css'
import currency from "../../../helpers/calcCurrency";
import { useNavigate } from "react-router-dom";
import FavoriteComponent from "./components/FavoriteComponent";
import { useDispatch } from "react-redux";
import { section } from "../../../../services/slices/validationSlice";
import notPhotoFound from "../../../../assets/no-photo-found.svg"

const Product = React.memo(function Product({ product }){

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const newPrice = product.price * (1 - product.discount/100)

  function handleSingleProduct(){
    dispatch(section(''))
    navigate(`/product/${product.id}`, {replace: true})
  }

  const handleErrorImgLoaded = (e) => {
    e.target.src = notPhotoFound
  }

  return (
    <article className="product-card" onClick={handleSingleProduct} data-testid="product">
      <div className="product-card-img">
      <picture>
        <source media="(max-width: 768px)" srcSet={product.image1.replace("w_600", "w_171")} width={171} height={171} />
        <source media="(min-width: 769px)" srcSet={product.image1.replace("w_600", "w_234")} width={234} height={234} />
        <img 
          src={product.image1 ? product.image1 : notPhotoFound} 
          onError={handleErrorImgLoaded}
          alt="photo" 
          className="img-photo skelleton" 
          width={171} 
          height={171} />
      </picture>
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