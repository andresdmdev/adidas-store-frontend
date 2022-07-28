import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { store } from './services/store/store.js'
import { Provider } from 'react-redux'
import { getAllProducts } from './services/slices/productsSlice.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllProducts from './app/components/main/allProducts/AllProducts'
import Offers from './app/components/main/offers/Offers'
import FavoriteProducts from './app/components/main/favorites/FavoriteProducts'
import Shoppings from './app/components/main/shopping/Shoppings'
import CategoriesProduct from './app/components/main/categories/CategoriesProduct'
import CartProducts from './app/components/main/cart/CartProducts'
import SingleProduct from './app/components/main/singleProduct/SingleProduct'

store.dispatch(getAllProducts())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/adidas-store-frontend/' element={<App />}>
            <Route index element={<AllProducts />}/>
            <Route path='offers' element={<Offers />} />
            <Route path='favorites' element={<FavoriteProducts />} />
            <Route path='shoppings' element={<Shoppings />} />
            <Route path='category/*' element={<CategoriesProduct />} />
            <Route path='cart' element={<CartProducts />} />
            <Route path='product' element={<SingleProduct />}>
              <Route path=':id' element={<SingleProduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
