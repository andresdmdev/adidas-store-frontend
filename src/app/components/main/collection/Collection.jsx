import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from '../../../../services/slices/productsSlice'
import Product from "../product/Product";
import '../product/styles/products.css'
import PageSection from "../PageSection";
import usePageCounter from "../../../hooks/usePageCounter";

export default function Collection(){

  const data = useSelector(selectAllProducts)

  const { startArray, finalArray, changePage, page } = usePageCounter(data.length)

  const collectionProducts = data.filter(product => {
    if(product.breadcrumbs === "Originals/Accessories"){
      return ({ ...product })
    }
  })

  const sliceCollectionProducts = collectionProducts.slice(startArray, finalArray).map(product => (
    <Product
      key={product.id} 
      product={product}
    />
  ))

  return (
    <>
      <section className="products" data-testid="collection">
        {sliceCollectionProducts}
      </section>
      <PageSection dataLength={collectionProducts.length} handleClick={changePage} activePage={page}  />
    </>
  )
}