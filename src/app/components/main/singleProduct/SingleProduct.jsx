import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchSingleProductById, selectSingleProduct } from "../../../../services/slices/productsSlice";
import './styles/singleProduct.css'
import CarrouselSingleProduct from "./components/CarrouselSingleProduct";
import GallerySingleProduct from "./components/GallerySingleProduct";
import FavoriteComponent from "../product/components/FavoriteComponent";
import QuantityProducts from "./components/QuantityProducts";
import ProductPrice from "./components/ProductPrice";

export default function SingleProduct(){

  const [photoGallery, setPhotoGallery] = useState(false)

  const dispatch = useDispatch()
  
  const { id } = useParams()

  useEffect(() => {
    dispatch(searchSingleProductById(id))
  }, [dispatch, searchSingleProductById, id]) 

  const product = useSelector(selectSingleProduct)

  const images = [product.image1,product.image2, product.image3, product.image4,product.image5, product.image6, product.image7, product.image8, product.image9].filter(elem => elem !== '')

  const handleShowPhotoGallery = () => {
    setPhotoGallery(photoGallery => !photoGallery)
  }

  return (
    <div className="product-container">
      <div className="product-photo-section">
        <CarrouselSingleProduct images={images} handleShowPhotoGallery={handleShowPhotoGallery} />
        { 
          photoGallery &&
          <GallerySingleProduct images={images} handleShowPhotoGallery={handleShowPhotoGallery} />
        }
      </div>
      <div className="product-info-section">
        <span className="product-category">{product.breadcrumbs}</span>
        <div className="product-title-container">
          <h1>{product.name}</h1>
          <FavoriteComponent 
            product={product} 
            fillBtn="product-favorite-icon--liked" 
            outLineBtn="product-favorite-icon" 
            name="favoriteProduct"
          />
        </div>
        <p className="product-description">{product.description}</p>
        <ProductPrice price={product.price} discount={product.discount} />
        <div className="product-info-section-container">
          <QuantityProducts product={product} />
        </div>
      </div>
    </div>
  )
}