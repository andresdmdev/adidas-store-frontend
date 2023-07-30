import { useDispatch } from 'react-redux'
import '../styles/profileStyles.css'
import { section } from '../../../../services/slices/validationSlice'

export default function ProfileMenu() {
  
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(section(id))
  }

  return (
    <div className="profile-menu-container" data-testid="profile-menu-container">
      <h2>Andres Marquez</h2>
      <span className="divider"></span>
      <div className="menu-list">
        <ul>
          <li><a href='#' onClick={() => handleClick('favorites')}>Favorites</a></li>
          <li><a href='#' onClick={() => handleClick('shoppings')}>Shippings</a></li>
          <li><a href='#' onClick={() => handleClick('cart')}>Cart</a></li>
        </ul>
      </div>
    </div>
  )
}