import arrowBtn from '../../../../../assets/arrow-btn.svg'
import arrowRightBtn from '../../../../../assets/arrow-right-btn.svg'

export default function ArrowSlider({ direction = 'left', handleDirection, size }) {
  return (
    <>
      <button className={`product-photo-arrow--${direction}`} name={`arrow${direction}`} aria-label={`arrow${direction}`} onClick={handleDirection}>
        <img src={direction === 'left' ? arrowBtn : arrowRightBtn} alt={`arrow-${direction}-btn`} width={size} height={size} />
      </button>
    </>
  )
}