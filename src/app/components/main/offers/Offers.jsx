import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../../../services/slices/productsSlice";
import Product from "../product/Product";
import '../product/styles/products.css'

export default function Offers(){

  const data = useSelector(selectAllProducts)

  const products = 
    data
      .filter(product => product.discount > 0)
      .map(product => (
        <Product
          product={product} 
          key={product.id} 
        />
    ))

  return (
    <>
      <div className="products">
        {
          products.length > 0 ?
          products :
          <p>There are no products</p>
        }
      </div>
    </>
  )
}