import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategory, saveCategory, allCategories, getAllCategoriesProducts } from "../../../../services/slices/categorySlice";
import { changeOption, selectMenuMovil, selectOption } from "../../../../services/slices/validationSlice";
import '../styles/headerStyles.css'

export default function SelectCategoryMovil(){

  const dataCategories = useSelector(allCategories)

  const category = useSelector(selectCategory) //marcar div

  const menu = useSelector(selectMenuMovil)

  const option = useSelector(selectOption)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllCategoriesProducts())
  }, [dispatch])

  const categories = 
    dataCategories
      .map(product => (
        <div 
          id={product} 
          key={product}
          onClick={handleClick}
          className="section_header_category_movil"
        >{product}</div>
      ))

  function handleClick(e){
    dispatch(saveCategory(e.target.id))

    if(option !== 'home'){
      dispatch(changeOption('home'))
    }
  
    if(e.target.id === ''){
      navigate('/', {replace: true})
    } else {
      navigate(`/category/${e.target.id}`, {replace: true})
    }
  }

  return(
    <div className="category_movil">
      {
        !menu &&
        <>
          <p className="category_movil_title">Categories</p>
          <div 
            id="categories"
            className='section_header_category_block_movil'
          >
            <div 
              id="" 
              className="section_header_category_movil" 
              onClick={handleClick}
            >All</div>
            {categories}
          </div>
        </>
      }
    </div>
  )
}