import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategory, saveCategory, allCategories, getAllCategoriesProducts } from "../../../services/slices/categorySlice";
import { changeOption, selectOption } from "../../../services/slices/validationSlice";
import './styles/headerStyles.css'

export default function SelectCategory(){

  const dataCategories = useSelector(allCategories)

  const category = useSelector(selectCategory)

  const option = useSelector(selectOption)

  const dispatch = useDispatch()

  const navigate = useNavigate()

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

    if(option !== 'home'){
      dispatch(changeOption('home'))
    }
  
    if(e.target.value === ''){
      navigate('/', {replace: true})
    } else {
      navigate(`/category/${e.target.value}`, {replace: true})
    }
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