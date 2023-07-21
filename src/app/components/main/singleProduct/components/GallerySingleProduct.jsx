import { useState } from 'react'
import CarrouselImages from "./CarrouselImages"
import { MdClose } from "react-icons/md";
import ArrowSlider from './ArrowSlider';
import PhotoCollection from './PhotoCollection';

export default function GallerySingleProduct({ images, handleShowPhotoGallery }) {

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

  const handleChangeImgPlace = (index) => {
    setImgPlaced(elem => ({ ...elem, place: index }))
  }

  return (
    <>
      <div className="gallery-section">
        <div className="product-carrousel-container-gallery">
          <button className='gallery-btn--close' name='close' aria-label='close' onClick={handleShowPhotoGallery}>
            <MdClose alt='menu-logo' className='img' />
          </button>
          <CarrouselImages images={images} imgPlaced={imgPlaced} handleTouchEnd={handleTouchEnd} handleTouchStart={handleTouchStart} section={'gallery'} />
          {
            imgPlaced.place > 0 &&
            <ArrowSlider direction='left' handleDirection={handleLeftProductPhoto} size={56} />
          }
          {
            imgPlaced.place < images.length - 1 &&
            <ArrowSlider direction='right' handleDirection={handleRightProductPhoto} size={56} />
          }
        </div>
        <div className="photo-collection-gallery">
          <PhotoCollection images={images} handlePhotoCollection={handleChangeImgPlace} imgPlaced={imgPlaced.place} section='gallery' /> 
        </div>
      </div>
    </>
  )
}