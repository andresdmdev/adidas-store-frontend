import './styles/app.css'
import AppSection from './AppSection'
import Header from './components/header/Header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllProducts } from '../services/slices/productsSlice'

// This component return the header and main section

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <div className='app'>
      <Header />
      <AppSection />
    </div>
  )
}

export default App
