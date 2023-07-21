import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import { store } from './services/store/store.js'
import { Provider } from 'react-redux'
import { getAllProducts } from './services/slices/productsSlice.js'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import AllProducts from './app/components/main/allProducts/AllProducts'
import Offers from './app/components/main/offers/Offers'
import SingleProduct from './app/components/main/singleProduct/SingleProduct'
import Collection from './app/components/main/collection/Collection'
import MenSection from './app/components/main/categories/MenSection'
import WomenSection from './app/components/main/categories/WomenSection'
import ContactSection from './app/components/main/contact/ContactSection'

// Get all products form Api when the app starts
store.dispatch(getAllProducts())

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<AllProducts />}/>
            <Route path='collection' element={<Collection />} />
            <Route path='men' element={<MenSection />} />
            <Route path='women' element={<WomenSection />} />
            <Route path='offers' element={<Offers />} />
            <Route path='contact' element={<ContactSection />} />
            <Route path='*' element={<Offers />} />
            <Route path='product/:id' element={<SingleProduct />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
)
