
import sadEmogi from "../../../assets/wrong-emogi.svg"

export default function PageNotFound() {
  return (
    <>
      <div className="error-message">
        <img src={sadEmogi} alt="sad-emogi" width={65} height={65} />
        <p>Ups! Something was wrong.</p>
        <span>Click the logo, please</span>
      </div>
    </>
  )
}