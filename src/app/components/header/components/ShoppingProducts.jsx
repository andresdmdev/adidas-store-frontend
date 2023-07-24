import { useDispatch, useSelector } from "react-redux"
import '../styles/shoppingStyles.css'
import CloseBtn from "./CloseBtn"
import { selectAllShoppings } from "../../../../services/slices/shoppingSlice"
import ticket from '../../../../assets/ticket.svg'

export default function ShoppingProducts({ handleCloseBtn }) {

  const data = useSelector(selectAllShoppings)

  const shopping = data.map(elem => (
    <article key={elem.ticket}>
      <img src={ticket} alt="shopping-photo" className="shopping-photo" width={50} height={50} />
      <div className="shopping-details">
        <span className="shopping-ticket">Ticket: {elem.ticket}</span>
        <div className="shopping-info">
          <span className="shopping-amount">Total Amount: ${elem.amount} </span>
        </div>
      </div>
    </article>
  ))

  return (
    <div className="shopping-container">
      <div className="shopping-heading">
        <h2>Shopping</h2>
        <CloseBtn className="btn--close" handleClick={handleCloseBtn}  />
      </div>
      <div className="shopping-line"></div>
      
      {
        data.length === 0 ? 
        <span className="shopping-empty-msg">You don't have shopping yet.</span>
        :
        <div className="shopping-tickets">{shopping}</div>
      }
    </div>
  )
}