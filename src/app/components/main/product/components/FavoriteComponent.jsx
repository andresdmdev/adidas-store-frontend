import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addFavorite } from "../../../../../services/slices/productsSlice"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function FavoriteComponent({ 
  product, 
  fillBtn, 
  outLineBtn,
  classBtn = '',
  name
}) {

  const [favoriteProduct, setFavoriteProduct] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const favoritesProducts = JSON.parse(localStorage.getItem('favorites')) || []

    const findFavoriteProduct = favoritesProducts.filter(elem => elem.id === product.id)

    if(findFavoriteProduct.length > 0){
      setFavoriteProduct(true)
    } else {
      setFavoriteProduct(false)
    }
  }, [product])

  function handleClickFav(e){
    e.stopPropagation()
    dispatch(addFavorite(product))
    setFavoriteProduct(favoriteProduct => !favoriteProduct)
  }

  return (
    <>
      <button className={classBtn} name={name} aria-label={name} onClick={handleClickFav}>
        {
          favoriteProduct ?
          <AiFillHeart className={fillBtn} /> :
          <AiOutlineHeart className={outLineBtn} />
        }
      </button>
    </>
  )
}