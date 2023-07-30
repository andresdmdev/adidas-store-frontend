import noFoundPhoto from '../../../../../assets/no-photo-found.svg'

export default function PhotoCollection({ images, handlePhotoCollection, section = '', imgPlaced = '' }) {
  return (
    <>
      {
        images.slice(0, 4).map((img, index) => (
            <img 
              key={index}
              className={`${section !== '' ? `${section}-`: ''}collection-photo ${imgPlaced === index ? 'active' : ''}`} 
              src={img ? img : noFoundPhoto} 
              alt="collection-photo" 
              onClick={() => handlePhotoCollection(index)}
              width={88} 
              height={88} />
          ))
      }
    </>
  )
}