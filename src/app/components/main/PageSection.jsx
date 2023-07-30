import "./styles/pageCounterSyles.css"

export default function PageSection({ dataLength, handleClick, activePage }) {

  const arrayLength = Math.ceil(dataLength / 12)

  const buttonPage = new Array(arrayLength).fill(null)

  const buttonList = buttonPage.map((elem, index) => index + 1).map(page => (
    <li key={page}>
      <button className={`${page === activePage ? 'active' : ''}`} onClick={() => handleClick(page)}>{page}</button>
    </li>
  ))

  return (
    <section>
      <ul>
        {buttonList}
      </ul>
    </section>
  )
}