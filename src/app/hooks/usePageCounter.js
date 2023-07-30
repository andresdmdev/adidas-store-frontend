import { useState } from "react"

export default function usePageCounter(dataLength){
  const [page, setPage] = useState(1)

  const handleClick = (page) => {
    setPage(page)
  }

  const newPage = page * 12
  const startArray = page === 1 ? 0 : (newPage - 12)
  const finalArray = page === 1 ? 12 : newPage > dataLength ? dataLength + 1 : newPage

  const pageCounter = {
    page: page,
    changePage: handleClick,
    startArray: startArray,
    finalArray: finalArray
  }

  return pageCounter
}