import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from '../../../../services/slices/productsSlice'
import Product from "../product/Product";
import '../product/styles/products.css'
import usePageCounter from "../../../hooks/usePageCounter";
import PageSection from "../PageSection";

export default function WomenSection(){

  const data = useSelector(selectAllProducts)

  const { startArray, finalArray, changePage, page } = usePageCounter(data.length)

  const products = data.slice().filter(product => {
    if(product.breadcrumbs === "Women/Shoes" || product.breadcrumbs === "Women/Clothing"){
      return ({ ...product })
    }
  })

  const sliceWomenSectionProducts = products.slice(startArray, finalArray).map(product => (
    <Product
      key={product.id} 
      product={product}
    />
  ))

  return (
    <>
      <section className="products" data-testid="womenSection">
        {sliceWomenSectionProducts}
      </section>
      <PageSection dataLength={products.length} handleClick={changePage} activePage={page}  />
    </>
  )
}