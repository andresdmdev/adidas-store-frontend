import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from '../../../../services/slices/productsSlice'
import Product from "../product/Product";
import '../product/styles/products.css'
import usePageCounter from "../../../hooks/usePageCounter";
import PageSection from "../PageSection";

export default function MenSection(){

  const data = useSelector(selectAllProducts)

  const { startArray, finalArray, changePage, page } = usePageCounter(data.length)

  const products = data.filter(product => {
    if(product.breadcrumbs === "Men/Shoes" || product.breadcrumbs === "Men/Clothing"){
      return ({ ...product })
    }
  })

  const sliceMenSectionProducts = products.slice(startArray, finalArray).map(product => (
    <Product
      key={product.id} 
      product={product}
    />
  ))

  return (
    <>
      <section className="products" data-testid="menSection">
        {sliceMenSectionProducts}
      </section>
      <PageSection dataLength={products.length} handleClick={changePage} activePage={page}  />
    </>
  )
}