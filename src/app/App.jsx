import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { selectShowSingleProduct } from '../services/slices/validationSlice'
import './App.css'
import AppSection from './AppSection'
import HeaderMovil from './components/header/movil/HeaderMovil'
import SearchMovil from './components/header/movil/SearchMovil'
import SelectCategoryMovil from './components/header/movil/SelectCategoryMovil'
import Menu from './components/menu/Menu'
import MenuMovil from './components/menu/MenuMovil'

function App() {

  const singleProduct = useSelector(selectShowSingleProduct)

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
