import React from "react";
import userPhoto from '../../../../assets/user.svg'

export default function SectionProfil(){
  return(
    <div className="section_menu_profil">
      <img 
        src={userPhoto} 
        alt="User photo" 
        className="section_menu_profil_photo"
      />
      <h4 className="section_menu_profil_greetings">Good morning 👏</h4>
      <h2 className="section_menu_profil_name">Cesar Marquez</h2>
    </div>
  )
}