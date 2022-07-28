import React from "react";
import SectionMenu from "./sections/SectionMenu";
import SectionProfil from "./sections/SectionProfil";
import './styles/menuStyle.css'

export default function Menu(){

  return(
    <div className="section_menu">
      <SectionProfil />
      <SectionMenu />
    </div>
  )
}