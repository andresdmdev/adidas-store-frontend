import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from '../../../../services/slices/productsSlice'
import Product from "../Product";
import '../styles/product.css'

export default function AllProducts(){

  const data = useSelector(selectAllProducts)

  const products = data.map(product => (
    <Product 
      product={product} 
      key={product.id}
    />
  ))

  return (
    <>
      <h1 className="products_title">All products</h1>
      <div className="products">
        {products}
      </div>
    </>
  )
}