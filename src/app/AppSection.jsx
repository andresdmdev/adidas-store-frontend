import React from "react";
import { useSelector } from "react-redux";
import { showError } from "../services/slices/productsSlice";
import MainSections from './components/main/MainSections'
import sadEmogi from '../assets/wrong-emogi.svg'
import { useLocation } from "react-router-dom";

const AppSection = React.memo(function AppSection(){

  const error = useSelector(showError)

  const { pathname } = useLocation()

  return (
    <div className='app-section'>
      <div className="section-main">
        { 
          error && pathname.length === 1 ? 
          <div className="error-message">
            <img src={sadEmogi} alt="sad-emogi" width={65} height={65} />
            <p>Ups! Something was wrong.</p>
            <span>Refresh the page, please</span>
          </div> : 
          <MainSections />
        }
      </div>
    </div>
  )
})

export default AppSection