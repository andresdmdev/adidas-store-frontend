import { useState } from "react"
import menuLogo from '../../../../assets/menu-logo.svg'
import { MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../../../services/slices/productsSlice";
import { section } from "../../../../services/slices/validationSlice";

const menuOptions = ['collection', 'men', 'women', 'offers', 'contact']

export default function MenuHeader(){

  const [showMenu, setShowMenu] = useState(false)

  const dispatch = useDispatch()
  const {pathname} = useLocation()

  const handleShowMenu = (event) => {
    event.stopPropagation()
    setShowMenu(showMenu => !showMenu)
    dispatch(section(''))
  }

  const handleNavigationPage = () => {
    dispatch(getAllProducts())
    dispatch(section(''))
  }

  const menuLink = menuOptions.map(option => {
    return (
      <li key={option}>
        <Link to={option} onClick={handleNavigationPage} className={`${pathname.includes(`/${option}`) ? 'active' : ''}`}>{option}</Link>
      </li>
    )
  })

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
              {menuLink}
            </ul>
          </div>
          <div className='header-menu-section-background' onClick={handleShowMenu}></div>
        </div>
      </div>
  )
}