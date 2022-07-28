import React from "react";
import { useSelector } from "react-redux";
import { selectMenuMovil } from "../../../../services/slices/validationSlice";
import SearchBar from "../SearchBar";
import '../styles/headerStyles.css'

export default function SearchMovil(){

  const menu = useSelector(selectMenuMovil)

  return(
    <>
      {
        !menu &&
        <div className="App_search_movil">
          <SearchBar />
        </div>
      }
    </>
  )
}