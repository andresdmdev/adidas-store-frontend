import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../../../services/slices/productsSlice";
import Product from "../product/Product";
import '../product/styles/products.css'
import usePageCounter from "../../../hooks/usePageCounter";
import PageSection from "../PageSection";

export default function Offers(){

  const data = useSelector(selectAllProducts)

  const { startArray, finalArray, changePage, page } = usePageCounter(data.length)

  const products = data.filter(product => product.discount > 0)
  
  const offersProducts = products.slice(startArray, finalArray).map(product => (
    <Product
      product={product} 
      key={product.id} 
    />
))

  return (
    <>
      <div className="products" data-testid="offerProducts">
        {
          products.length > 0 ?
          offersProducts :
          <p>There are no products</p>
        }
      </div>
      <PageSection dataLength={products.length} handleClick={changePage} activePage={page}  />
    </>
  )
}