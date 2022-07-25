import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProductByName, getAllProducts } from "../../../services/slices/productsSlice";
import { changeOption, selectOption } from "../../../services/slices/validationSlice";
import search from '../../../assets/search.svg'

export default function SearchBar(){

  const [productName, setProductName] = useState('')

  const dispatch = useDispatch()

  const option = useSelector(selectOption)

  function handleSubmit(e){
    e.preventDefault()
    if(productName === ''){

      dispatch(getAllProducts())

      if(option === 'Cart' || option === 'Favorites' || option === 'Shoppings'){
        dispatch(changeOption('Home'))
      }
      
    } else if(option === 'Cart' || option === 'Favorites' || option === 'Shoppings'){

      dispatch(changeOption('Home'))

      dispatch(searchProductByName(productName))
      
    } else {
      dispatch(searchProductByName(productName))
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