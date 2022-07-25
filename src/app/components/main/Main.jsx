import React from "react";
import { useSelector } from "react-redux";
import { showError } from "../../../services/slices/productsSlice";
import MainSections from "./MainSections";

export default function Main(){

  const error = useSelector(showError)

  return (
    <div className="section_main">
      { error ? 
        <>
          <h2>{error}</h2>
          <p>Please, search again</p>
        </> : 
        <MainSections />
      }
    </div>
  )
}