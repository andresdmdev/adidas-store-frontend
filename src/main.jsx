import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import { setupStore } from './services/store/store.js'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import AllProducts from './app/components/main/allProducts/AllProducts'
import Offers from './app/components/main/offers/Offers'
import SingleProduct from './app/components/main/singleProduct/SingleProduct'
import Collection from './app/components/main/collection/Collection'
import MenSection from './app/components/main/categories/MenSection'
import WomenSection from './app/components/main/categories/WomenSection'
import ContactSection from './app/components/main/contact/ContactSection'
import PageNotFound from './app/components/main/PageNotFound'

// Get all products form Api when the app starts

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={setupStore()}>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<AllProducts />}/>
            <Route path='collection' element={<Collection />} />
            <Route path='men' element={<MenSection />} />
            <Route path='women' element={<WomenSection />} />
            <Route path='offers' element={<Offers />} />
            <Route path='contact' element={<ContactSection />} />
            <Route path='product/:id' element={<SingleProduct />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
)
