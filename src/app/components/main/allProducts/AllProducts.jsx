import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from '../../../../services/slices/productsSlice'
import Product from "../product/Product";
import '../product/styles/products.css'

export default function AllProducts(){

  const data = useSelector(selectAllProducts)

  const products = data.slice().map(product => (
    <Product
      key={product.id} 
      product={product}
    />
  ))

  return (
    <>
      <section className="products">
        {products}
      </section>
    </>
  )
}