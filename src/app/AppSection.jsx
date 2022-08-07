import React from "react";
import './App.css'
import { useSelector } from "react-redux";
import { showError } from "../services/slices/productsSlice";
import Header from './components/header/Header'
import MainSections from './components/main/MainSections'
import { selectMenuMovil } from "../services/slices/validationSlice";

const AppSection = React.memo(function AppSection(){

  const error = useSelector(showError)
  const menu = useSelector(selectMenuMovil)

  return (
    <div className='App_section'>
      <Header />
      {
        !menu &&
        <div className="section_main">
          { error ? 
            <>
              <h2>{error}</h2>
              <p>Please, search again</p>
            </> : 
            <MainSections />
          }
        </div>
      }
    </div>
  )
})

export default AppSection