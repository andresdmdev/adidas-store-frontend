import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { showError } from '../services/slices/productsSlice'
import './App.css'
import Header from './components/header/Header'
import MainSections from './components/main/MainSections'
import Menu from './components/menu/Menu'

function App() {

  const error = useSelector(showError)

  return (
    <div className='App'>
      <>
        <Routes>
          <Route path='*' element={<Menu />} />
        </Routes>
      </>
      <div className='App_section'>
        <Routes>
          <Route path='*' element={<Header />} />
        </Routes>
        <div className="section_main">
          { error ? 
            <>
              <h2>{error}</h2>
              <p>Please, search again</p>
            </> : 
            <MainSections />
          }
        </div>
      </div>
    </div>
  )
}

export default App
