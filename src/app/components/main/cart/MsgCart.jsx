import React from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../../../services/slices/cartSlice";
import { changeOption } from "../../../../services/slices/validationSlice";
import './styles/cartProduct.css'

export default function MsgCart({ showTicket }){

  const dispatch = useDispatch()

  function handleClickShoppings(){
    dispatch(resetCart())
    dispatch(changeOption('Shoppings'))
  }

  function handleClickContinue(){
    dispatch(resetCart())
    showTicket()
  }

  return (
    <div className="msg">
      <h2 className="msg_title">Purchase Completed Successfuly 🎉</h2>
      <h4 className="msg_subtitle">Thanks for shopping 👏</h4>
      <div className="msg_block">      
        <div 
          className="msg_btn_shoppings"
          onClick={handleClickShoppings}
        >
          Go to Shoppings
        </div>
        <div 
          className="msg_btn_continue"
          onClick={handleClickContinue}
        >
          Continue
        </div>
      </div>
    </div>
  )
}