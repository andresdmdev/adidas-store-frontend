import './styles/headerStyles.css'
import brandLogo from '../../../assets/logoBrand.svg'
import MenuHeader from './components/MenuHeader';
import CartProducts from './components/CartProducts';
import { useDispatch, useSelector } from 'react-redux';
import ProfileMenu from './components/ProfileMenu';
import { selectSection, section } from '../../../services/slices/validationSlice';
import SearchBar from './components/SearchBar';
import FavoriteProducts from './components/FavoriteProducts';
import ShoppingProducts from './components/ShoppingProducts';
import SideSectionHeader from './components/SideSectionHeader';

export default function Header() {

  const dispatch = useDispatch()

  const sectionOption = useSelector(selectSection)

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
      <SearchBar />
      <SideSectionHeader handleShowSectionById={handleShowSectionById} />
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