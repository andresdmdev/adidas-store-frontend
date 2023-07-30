
import { MdClose } from "react-icons/md";

export default function CloseBtn({ handleClick }){
  return (
    <>
      <button className='btn--close' name='close' aria-label='close' onClick={handleClick} data-testid='closeBtn'>
        <MdClose alt='btn-close' className='img' />
      </button>
    </>
  )
}