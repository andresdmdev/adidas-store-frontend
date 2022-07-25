import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../../../services/slices/productsSlice";
import Product from "../Product";
import '../styles/product.css'

export default function CategoriesProduct({ category }){

  const data = useSelector(selectAllProducts)

  const products = 
    data
      .filter(product => product.breadcrumbs === category)
      .map(product => (
        <Product product={product} key={product.id} />
      ))

  return(
    <div>
      <h1 className="products_title">{category}</h1>
      <div className="products">
        {
          products.length === 0 ? 
          <p>This product doesn't exist in {category}</p> :
          products
        }
      </div>
    </div>
  )
}