import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch } from "react-redux";
import { getAllProducts, searchProductByName } from "../../../../services/slices/productsSlice";
import { section } from "../../../../services/slices/validationSlice";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ showSearchMovil }) {

  const [inputSearch, setInputSearch] = useState('')

  const dispatch = useDispatch()

  const navigation = useNavigate()

  const handleChangeInput = (e) => {
    setInputSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(inputSearch === '') {
      dispatch(getAllProducts())
    } else {
      dispatch(searchProductByName(inputSearch))
    }
    dispatch(section(''))
    navigation('/')
  }

  return (
    <div className={`header-search ${showSearchMovil ? 'disable' : ''}`}>
      <form className='search-form' onSubmit={handleSubmit}>
        <label htmlFor='searchBar'>
          <input 
            id='searchBar' 
            placeholder='Search something...'
            name='searchBar'
            value={inputSearch}
            onChange={handleChangeInput}
            className='search-form-input-bar' />
        </label>
        <button
          className='search-form-input-button'
          name='search' 
          aria-label='search'
        >
          <GoSearch className='input-button-icon' />
        </button>
      </form>
    </div>
  )
}