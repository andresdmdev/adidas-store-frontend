import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Menu from './components/menu/Menu'

function App() {
  

  return (
    <div className="App">
      <Menu />
      <div className='App_section'>
        <Header />
        <Main />
      </div>
    </div>
  )
}

export default App
