import { useState } from "react"
import menuLogo from '../../../../assets/menu-logo.svg'
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../../../services/slices/productsSlice";
import { section } from "../../../../services/slices/validationSlice";

export default function MenuHeader(){

  const [showMenu, setShowMenu] = useState(false)

  const navigation = useNavigate()
  const dispatch = useDispatch()
  const {pathname} = useLocation()

  const handleShowMenu = (event) => {
    event.stopPropagation()
    setShowMenu(showMenu => !showMenu)
    dispatch(section(''))
  }

  const handleNavigationPage = (e, page) => {
    e.preventDefault()
    dispatch(getAllProducts())
    dispatch(section(''))
    navigation(`/${page}`)
  }

  return (
    <div className='header-menu'>
        <button className='header-menu-btn' name='menu' aria-label='menu' onClick={handleShowMenu}>
          <img src={menuLogo} alt='menu-logo' width={16} height={15} />
        </button>
        <div className={`header-menu-section${showMenu ? '--movil': ''}`}>
          <div className={`header-menu-section-container${showMenu ? '--movil': ''}`}>
            {
              showMenu &&
              <button className='menu-btn--close' name='close' aria-label='close' onClick={handleShowMenu}>
                <MdClose alt='menu-logo' className='img' />
              </button>
            }
            <ul className={`header-menu-list${showMenu ? '--movil': ''}`}>
              <li><a href="#" onClick={(e) => handleNavigationPage(e, 'collection')} className={`${pathname.includes('collection') ? 'active' : ''}`}>Collections</a></li>
              <li><a href="#" onClick={(e) => handleNavigationPage(e, 'men')} className={`${pathname.includes("/men") ? 'active' : ''}`}>Men</a></li>
              <li><a href="#" onClick={(e) => handleNavigationPage(e, 'women')} className={`${pathname.includes("women") ? 'active' : ''}`}>Women</a></li>
              <li><a href="#" onClick={(e) => handleNavigationPage(e, 'offers')} className={`${pathname.includes('offers') ? 'active' : ''}`}>Offers</a></li>
              <li><a href="#" onClick={(e) => handleNavigationPage(e, 'contact')} className={`${pathname.includes('contact') ? 'active' : ''}`}>Contact</a></li>
            </ul>
          </div>
          <div className='header-menu-section-background' onClick={handleShowMenu}></div>
        </div>
      </div>
  )
}