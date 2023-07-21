import currency from "../../../../helpers/calcCurrency";

export default function ProductPrice({ price, discount }) {
  return (
    <div className="product-price-info">
      <div className="product-price-section">
        <span className="product-price">{currency(price - (price * (discount/100)))}</span>
        {
          discount > 0 &&
          <div className="product-discount"><span>{discount}%</span></div>
        }
      </div>
      {
        discount > 0 &&
        <span className="producto-old-price">{currency(price)}</span>
      }
    </div>
  )
}