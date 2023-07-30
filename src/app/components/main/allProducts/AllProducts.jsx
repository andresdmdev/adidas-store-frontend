import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from '../../../../services/slices/productsSlice'
import Product from "../product/Product";
import '../product/styles/products.css'
import PageSection from "../PageSection";
import usePageCounter from "../../../hooks/usePageCounter";

export default function AllProducts(){

  const data = useSelector(selectAllProducts)

  const { startArray, finalArray, changePage, page } = usePageCounter(data.length)

  const products = data.slice(startArray, finalArray).map(product => (
    <Product
      key={product.id} 
      product={product}
    />
  ))

  return (
    <>
      <section className="products" data-testid="all-products">
        {products}
      </section>
      <PageSection dataLength={data.length} handleClick={changePage} activePage={page}  />
    </>
  )
}