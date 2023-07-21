import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from '../../../../services/slices/productsSlice'
import Product from "../product/Product";
import '../product/styles/products.css'

export default function Collection(){

  const data = useSelector(selectAllProducts)

  const products = data.slice().filter(product => {
    if(product.breadcrumbs === "Originals/Accessories"){
      return ({ ...product })
    }
  }).map(product => (
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