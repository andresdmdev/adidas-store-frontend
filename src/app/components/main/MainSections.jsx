import React from "react";
import { useSelector } from "react-redux";
import { selectCategory } from "../../../services/slices/categorySlice";
import { selectStatus } from "../../../services/slices/productsSlice";
import { selectOption } from "../../../services/slices/validationSlice";
import AllProducts from "./allProducts/AllProducts";
import CartProducts from "./cart/CartProducts";
import CategoriesProduct from "./categories/CategoriesProduct";
import FavoriteProducts from "./favorites/FavoriteProducts";
import Offers from "./offers/Offers";
import Shoppings from "./shopping/Shoppings";
import './styles/mainSection.css'

export default function MainSections(){

  const category = useSelector(selectCategory)

  const status = useSelector(selectStatus)

  const option = useSelector(selectOption)

  return (
    <>
      {
        status === 'loading' ?
        <span className="loader"></span> :
        <>
          { !category && option === 'Home' && <AllProducts />}
          { !category && option === 'Offers' && <Offers /> }
          { !category && option === 'Cart' && <CartProducts /> }
          { !category && option === 'Favorites' && <FavoriteProducts /> }
          { !category && option === 'Shoppings' && <Shoppings /> }
          { category && <CategoriesProduct category={category} /> }
        </>
      }
    </>
  )
}