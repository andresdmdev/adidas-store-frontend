import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoriesProducts } from '../services/slices/categorySlice'
import { selectShowSingleProduct } from '../services/slices/validationSlice'
import AppSection from './AppSection'
import HeaderMovil from './components/header/movil/HeaderMovil'
import SearchMovil from './components/header/movil/SearchMovil'
import SelectCategoryMovil from './components/header/movil/SelectCategoryMovil'
import Menu from './components/menu/Menu'
import MenuMovil from './components/menu/MenuMovil'

function App() {

  const singleProduct = useSelector(selectShowSingleProduct)
  const dispatch = useDispatch()

  // Get all categories
  useEffect(() => {
    dispatch(getAllCategoriesProducts())
  }, [dispatch, getAllCategoriesProducts])
  
  // Extructure of app - Web and Movil
  return (
    <div className='App'>
      <HeaderMovil />
      <MenuMovil />
      { 
        !singleProduct &&
        <>
          <SearchMovil />
          <SelectCategoryMovil />
        </>
      }
      <div className='App_menu'>
        <Menu />
      </div>
      <AppSection />
    </div>
  )
}

export default App
