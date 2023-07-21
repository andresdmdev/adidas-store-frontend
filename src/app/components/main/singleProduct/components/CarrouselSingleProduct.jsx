import { useState } from "react"
import CarrouselImages from "./CarrouselImages"
import ArrowSlider from "./ArrowSlider"
import PhotoCollection from "./PhotoCollection"

export default function CarrouselSingleProduct({ images, handleShowPhotoGallery }) {

  const [imgPlaced, setImgPlaced] = useState({ place: 0, start: 0, end: 0})

  const handleTouchStart = (e) => {
    setImgPlaced(elem => ({ ...elem, start: e.changedTouches[0].pageX}))
  }

  const handleTouchEnd = (e) => {
    setImgPlaced(elem => ({ ...elem, end: e.changedTouches[0].pageX}))

    if(imgPlaced.start > e.changedTouches[0].pageX) {
      if(imgPlaced.place < images.length - 1){
        setImgPlaced(elem => ({ ...elem, place: elem.place + 1 }))
      }
    } else if(imgPlaced.start < e.changedTouches[0].pageX) {
      if(imgPlaced.place > 0){
        setImgPlaced(elem => ({ ...elem, place: elem.place - 1 }))
      }
    }
  }

  const handleLeftProductPhoto = () => {
    if(imgPlaced.place > 0){
      setImgPlaced(elem => ({ ...elem, place: elem.place - 1 }))
    }
  }

  const handleRightProductPhoto = () => {
    if(imgPlaced.place < images.length - 1){
      setImgPlaced(elem => ({ ...elem, place: elem.place + 1 }))
    }
  }

  return (
    <>
      <div className="product-carrousel-container">
        <CarrouselImages imgPlaced={imgPlaced} handleTouchEnd={handleTouchEnd} handleTouchStart={handleTouchStart} images={images} section={''} />
        {
          imgPlaced.place > 0 &&
          <ArrowSlider direction="left" handleDirection={handleLeftProductPhoto} size={40} />
        }
        {
          imgPlaced.place < images.length - 1 &&
          <ArrowSlider direction="right" handleDirection={handleRightProductPhoto} size={40} />
        }
      </div>
      <div className="photo-collection">
        <PhotoCollection images={images} handlePhotoCollection={handleShowPhotoGallery}  />
      </div>
    </>
  )
}