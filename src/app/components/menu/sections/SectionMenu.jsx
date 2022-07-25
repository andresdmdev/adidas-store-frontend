import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCategory } from "../../../../services/slices/categorySlice";
import { getAllProducts } from "../../../../services/slices/productsSlice";
import { changeOption, selectOption } from "../../../../services/slices/validationSlice";
import heart from '../../../../assets/heart.svg'
import shop from '../../../../assets/shop.svg'
import home from '../../../../assets/home.svg'
import offers from '../../../../assets/offers.svg'

export default function SectionMenu(){

  const assets = [
    { title: 'Home', img: home },
    { title: 'Offers', img: offers },
    { title: 'Favorites', img: heart },
    { title: 'Shoppings', img: shop },
  ]

  const option = useSelector(selectOption)

  const dispatch = useDispatch()

  function handleClick(e){
    dispatch(saveCategory(''))
    dispatch(changeOption(e.target.id))
    if(option === 'Home' || option === 'Offers'){
      dispatch(getAllProducts())
    }
  }

  const menuButtons = assets.map(option => (
    <div 
      className="section_menu_buttons_links" 
      key={option.title}
      id={option.title}
      onClick={(e) => handleClick(e)}
    >
      <img 
        src={option.img} 
        alt={option.title} 
        id={option.title} 
        className='section_menu_buttons_links_img'
      />
      <h5 
        id={option.title}
        className='section_menu_buttons_links_name'
      >
      {option.title}
      </h5>
    </div>
  ))

  return(
    <div className="section_menu_buttons">
      <h4 className="section_menu_buttons_title">Menu</h4>
      {menuButtons}
    </div>
  )
}