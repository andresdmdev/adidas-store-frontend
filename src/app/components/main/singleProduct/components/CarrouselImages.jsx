import notFoundPhoto from '../../../../../assets/no-photo-found.svg'

export default function CarrouselImages({ imgPlaced, handleTouchEnd, handleTouchStart, images, section }){
  console.log(images)
  return (
    <>
      <div 
          style={{ transform: `translateX(-${imgPlaced.place * 100}%)` }}
          className={`photo-carrousel${section !== '' ? `-${section}`: ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          >
          {
            images.map((img, index) => (
              <img 
                key={index}
                className={`product-photo${section !== '' ? `-${section}`: ''}`}
                src={img ? img : notFoundPhoto} 
                alt="product-photo" 
                width={375} 
                height={375} />
            ))
          }
        </div>
    </>
  )
}