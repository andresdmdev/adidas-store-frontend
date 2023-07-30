
import { selectCartProducts } from '../../../../services/slices/productsSlice'
import cartLogo from '../../../../assets/cart.svg'
import profileLogo from '../../../../assets/perfil.svg'
import { useSelector } from 'react-redux'

export default function SideSectionHeader({ handleShowSectionById }) {

  const cartProductCounter = useSelector(selectCartProducts)

  return (
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
  )
}