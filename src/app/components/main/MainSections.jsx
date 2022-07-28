import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectStatus } from "../../../services/slices/productsSlice";
import './styles/mainSection.css'

export default function MainSections(){
  
  const status = useSelector(selectStatus)

  return (
    <>
      {
        status === 'loading' ?
        <span className="loader"></span> :
        <>
         <Outlet />
        </>
      }
    </>
  )
}