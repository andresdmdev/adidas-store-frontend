import React from "react";
import { useSelector } from "react-redux";
import { selectFavoritesProducts } from "../../../../services/slices/productsSlice";
import Product from "../Product";
import '../styles/product.css'

export default function FavoriteProducts(){

  const data = useSelector(selectFavoritesProducts)

  const products = data.map(product => (
      
      product.favorite &&
      <Product 
        product={product} 
        key={product.id} 
      />
  ))

  return (
    <>
      <h1 className="products_title">Favorites</h1>
      <div className="products">
        {
          products.length === 0 ?
          <p>No products Added</p> :
          products
        }
      </div>
    </>
  )
}