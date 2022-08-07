import React from "react";
import '../styles/headerStyles.css'
import profil from '../../../../assets/user.svg'
import logo from '../../../../assets/logo.svg'
import menuLogo from '../../../../assets/menu-logo.svg'
import menuLigth from '../../../../assets/menu-ligth.svg'
import { useDispatch, useSelector } from "react-redux";
import { 
  menuMovil, 
  selectMenuMovil, 
  selectShowSingleProduct, 
  singleProduct 
} from "../../../../services/slices/validationSlice";
import backLogo from '../../../../assets/back-logo.svg'
import { useNavigate } from "react-router-dom";

const HeaderMovil = React.memo(function HeaderMovil(){

  const menu = useSelector(selectMenuMovil)
  const oneProduct = useSelector(selectShowSingleProduct)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleMenu(){
    dispatch(menuMovil())
  }

  function handleClick(){
    dispatch(singleProduct(false))
    
    navigate('/', {replace: true})
  }

  return (
    <div className='header_movil'>
      {
        oneProduct ?
        <div onClick={handleClick} className='header_movil_back'>
          <img 
            src={backLogo} 
            alt="back-logo" 
            className="header_movil_back_logo" />
        </div> :
        <img 
          src={profil} 
          alt="profil" 
          className='header_movil_profil' />
      }
      <img src={logo} alt="logo" className='header_movil_logo' onClick={handleClick} />
      <div className={`header_movil_menu_logo ${!menu && 'ligth'}`} onClick={handleMenu}>
        <img 
          src={menu ? menuLogo : menuLigth} 
          alt="menu-logo" 
          className={`header_movil_menu_logo_icon ${!menu && 'ligth'}`} />
      </div>
    </div>
  )
})

export default HeaderMovil