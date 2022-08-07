import React from "react";
import cartLigth from '../../../../assets/cart-ligth.svg'
import cartDark from '../../../../assets/cart-dark.svg'

const SectionCartMovil = React.memo(function SectionCartMovil({ handleClick, section }){
  return (
    <div 
      className="section_menu_buttons_links cart" 
      key='cart'
      id='cart'
      onClick={handleClick}
    >
      <img 
        src={section === 'cart' ? cartDark : cartLigth} 
        alt='cart'
        id='cart'
        className={`section_menu_buttons_links_img ${section === 'cart' && 'toggle'}`}
      />
      <h5 
        id='cart'
        className={`section_menu_buttons_links_name ${section === 'cart' && 'toggle'}`}
      >
      cart
      </h5>
    </div>
  )
})

export default SectionCartMovil