import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProductByName, getAllProducts } from "../../../services/slices/productsSlice";
import { changeOption, selectOption } from "../../../services/slices/validationSlice";
import search from '../../../assets/search.svg'
import { useNavigate } from "react-router-dom";

export default function SearchBar(){

  const [productName, setProductName] = useState('')

  const dispatch = useDispatch()

  const option = useSelector(selectOption)

  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    
    if(productName === ''){

      dispatch(getAllProducts())

      if(option !== 'home' && option !== 'offers'){
        dispatch(changeOption('home'))
        navigate(`/`, {replace: true})
      }
      
    } else {
      dispatch(searchProductByName(productName))

      if(option !== 'home' && option !== 'offers'){
        dispatch(changeOption('home'))
        navigate(`/`, {replace: true})
      }
    }
  }

  return(
    <div className="section_header_search">
      <form onSubmit={handleSubmit} className='section_header_search_form'>
        <button className="section_header_search_form_btn">
          <img 
            src={search} 
            alt="search" 
            className="section_header_search_img"
            type='submit'
          />
        </button>
        <input 
          type="text"
          id="productName"
          placeholder="Search product"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className='section_header_search_input'
        />
      </form>
    </div>
  )
}