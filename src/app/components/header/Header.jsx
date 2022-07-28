import React from "react";
import Cart from "./Cart";
import SearchBar from "./SearchBar";
import SelectCategory from "./SelectCategory";
import './styles/headerStyles.css'

export default function Header(){
  return(
    <div className="section_header">
      <SelectCategory />
      <SearchBar />
      <Cart />
    </div>
  )
}