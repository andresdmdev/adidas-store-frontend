import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, saveCategory, allCategories, getAllCategoriesProducts } from "../../../services/slices/categorySlice";
import './styles/headerStyles.css'

export default function SelectCategory(){

  const dataCategories = useSelector(allCategories)

  const category = useSelector(selectCategory)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategoriesProducts())
  }, [dispatch])

  const categories = 
    dataCategories
      .map(product => (
        <option 
          value={product} 
          key={product}
        >{product}</option>
      ))

  function handleChange(e){
    dispatch(saveCategory(e.target.value))
  }

  return(
    <div className="section_header_category">
      <select 
        name="header_categories" 
        id="categories"
        onChange={handleChange}
        value={category}
        className='section_header_category_select'
      >
        <option value="">All products</option>
        {categories}
      </select>
    </div>
  )
}