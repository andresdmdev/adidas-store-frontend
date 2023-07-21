import './styles/headerStyles.css'
import brandLogo from '../../../assets/logoBrand.svg'
import cartLogo from '../../../assets/cart.svg'
import profileLogo from '../../../assets/perfil.svg'
import MenuHeader from './components/MenuHeader';
import { useLocation } from 'react-router-dom';
import CartProducts from './components/CartProducts';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartProducts } from '../../../services/slices/productsSlice';
import ProfileMenu from './components/ProfileMenu';
import { selectSection, section } from '../../../services/slices/validationSlice';
import SearchBar from './components/SearchBar';
import FavoriteProducts from './components/FavoriteProducts';
import ShoppingProducts from './components/ShoppingProducts';

export default function Header() {

  const locationUrl = useLocation()
  const cartProductCounter = useSelector(selectCartProducts)

  const dispatch = useDispatch()

  const sectionOption = useSelector(selectSection)

  // Si la url incluye la palabra "producto" la barra de busqueda desaparece
  const showSearchMovil = locationUrl.pathname.includes('product')

  const handleShowSectionById = (id) => {
    if(sectionOption === id){
      dispatch(section(''))
    } else {
      dispatch(section(`${id}`))
    }
  }

  return (
    <header className="header">
      <MenuHeader />
      <a className='header-logo' href='#'>
        <img src={brandLogo} alt='brand-logo' width={35} height={27} />
      </a>
      <SearchBar showSearchMovil={showSearchMovil} />
      <div className='header-cart'>
        <button className='cart-button' name='cart' aria-label='cart' onClick={() => handleShowSectionById('cart')}>
          <img src={cartLogo} alt='cart-logo' width={22} height={20} />
          {
            cartProductCounter.length > 0 &&
            <div className='cart-counter'>{cartProductCounter.length}</div>
          }
        </button>
        <button className='profile-button' name='profile' aria-label='profile' onClick={() => handleShowSectionById('profile')}>
          <img src={profileLogo} alt='profile-logo' width={24} height={24} />
        </button>
      </div>
      {
        sectionOption === 'cart' &&
        <CartProducts handleCloseBtn={() => handleShowSectionById('cart')} />
      }
      {
        sectionOption === 'profile' &&
        <ProfileMenu />
      }
      {
        sectionOption === 'favorites' &&
        <FavoriteProducts handleCloseBtn={() => handleShowSectionById('favorites')} />
      }
      {
        sectionOption === 'shoppings' &&
        <ShoppingProducts  handleCloseBtn={() => handleShowSectionById('shoppings')} />
      }
    </header>
  )
}