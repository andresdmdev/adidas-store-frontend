import React, { useEffect } from "react";
import heart from '../../../../assets/heart.svg'
import shop from '../../../../assets/shop.svg'
import home from '../../../../assets/home.svg'
import offers from '../../../../assets/offers.svg'
import homeDark from '../../../../assets/home-dark.svg'
import shopDark from '../../../../assets/shop-dark.svg'
import heartDark from '../../../../assets/heart-dark.svg'
import offersDark from '../../../../assets/offers-dark.svg'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeOption, menuMovil, selectOption } from "../../../../services/slices/validationSlice";
import { saveCategory } from "../../../../services/slices/categorySlice";
import SectionCartMovil from "./SectionCartMovil";

export default function SectionMenu(){

  const assets = [
    { title: 'home', img: home, imgDark: homeDark },
    { title: 'offers', img: offers,imgDark: offersDark },
    { title: 'favorites', img: heart, imgDark: heartDark },
    { title: 'shoppings', img: shop, imgDark: shopDark }
  ]

  const navigate = useNavigate()
  const section = useSelector(selectOption)
  const dispatch = useDispatch()

  function handleClick(e){

    const format = e.target.id

    navigate(`/${format === 'home' ? '' : format}`, {replace:true})

    dispatch(changeOption(e.target.id))
    dispatch(saveCategory(''))

    if(window.innerWidth < 800){
      dispatch(menuMovil())
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
        src={section === option.title ? option.imgDark : option.img} 
        alt={option.title} 
        id={option.title} 
        className={`section_menu_buttons_links_img ${section === option.title && 'toggle'}`}
      />
      <h5 
        id={option.title}
        className={`section_menu_buttons_links_name ${section === option.title && 'toggle'}`}
      >
      {option.title}
      </h5>
    </div>
  ))

  return(
    <div className="section_menu_buttons">
      <h4 className="section_menu_buttons_title">Menu</h4>
      {menuButtons}
      <SectionCartMovil handleClick={handleClick} section={section} />
    </div>
  )
}