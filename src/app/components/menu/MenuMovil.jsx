import React from "react";
import { useSelector } from "react-redux";
import { selectMenuMovil } from "../../../services/slices/validationSlice";
import SectionMenu from "./sections/SectionMenu";

export default function MenuMovil(){

  const menu = useSelector(selectMenuMovil)
  
  return (
    <>
      {
        menu &&
        <div className='App_menu_movil'>
          <SectionMenu />
        </div>
      }
    </>
  )
}