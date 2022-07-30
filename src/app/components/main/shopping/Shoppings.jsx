import React from "react";
import { useSelector } from "react-redux";
import { selectAllShoppings } from "../../../../services/slices/shoppinsSlice";
import '../styles/product.css'
import { nanoid } from "@reduxjs/toolkit";
import ShoppingCard from "./ShoppingCard";

export default function Shoppings(){

  const data = useSelector(selectAllShoppings)

  const products = data.map(product => (
    <ShoppingCard key={nanoid()} product={product} />
  ))

  return (
    <>
      <h1 className="products_title">Shoppings history</h1>
      <div className="shoppings">
        {
          products.length === 0 ? 
          <p>No history of shopping</p> :
          products
        }
      </div>
    </>
  )
}