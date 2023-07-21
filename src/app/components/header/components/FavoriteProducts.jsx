import { useDispatch, useSelector } from "react-redux"
import '../styles/favoriteStyles.css'
import CloseBtn from "./CloseBtn"
import { useNavigate } from "react-router-dom"
import { section } from "../../../../services/slices/validationSlice"
import { addFavorite, selectFavoritesProducts } from "../../../../services/slices/productsSlice"
import { AiFillHeart } from "react-icons/ai";

export default function FavoriteProducts({ handleCloseBtn }) {

  const data = useSelector(selectFavoritesProducts)

  const dispatch = useDispatch()

  const navigation = useNavigate()

  const handleDeleteFavoriteProduct = (e, elem) => {
    e.stopPropagation()
    dispatch(addFavorite(elem))
  }

  const handleNavigationToSingleProductPage = (e, id) => {
    e.stopPropagation()
    navigation(`/product/${id}`, { replace: true })
    dispatch(section(''))
  }

  const products = data.map(elem => (
    <article key={elem.id} onClick={(e) => handleNavigationToSingleProductPage(e, elem.id)}>
      <img src={elem.image1} alt="product-favorite" className="product-favorite-photo" width={50} height={50} />
      <div className="product-favorite-details">
        <span className="product-favorite-name">{elem.name}</span>
        <div className="product-favorite-info">
          <span className="product-favorite-price">{elem.breadcrumbs} </span>
        </div>
      </div>
      <button className="heart-container" name='trash' aria-label='trash' onClick={(e) => handleDeleteFavoriteProduct(e, elem)}>
        <AiFillHeart fontSize={16} color="#FF7E1B" />
      </button>
    </article>
  ))

  return (
    <div className="favorite-container">
      <div className="favorite-heading">
        <h2>Favorites</h2>
        <CloseBtn handleClick={handleCloseBtn}  />
      </div>
      <div className="favorite-line"></div>
      
      {
        data.length === 0 ? 
        <span className="favorite-empty-msg">You don't have favorite products.</span>
        :
        <div className="favorite-products">{products}</div>
      }
    </div>
  )
}