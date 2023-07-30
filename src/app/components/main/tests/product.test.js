import { MemoryRouter } from "react-router-dom"
import { renderWithProviders } from "../../../utils/test-utils"
import AllProducts from "../allProducts/AllProducts"
import { setupStore } from "../../../../services/store/store"
import { screen } from "@testing-library/dom"
import "@testing-library/jest-dom"
import Collection from "../collection/Collection"
import MenSection from "../categories/MenSection"
import WomenSection from "../categories/WomenSection"
import Offers from "../offers/Offers"
import SingleProduct from "../singleProduct/SingleProduct"
import { data } from "../../../../services/slices/helpers/data-test"
import { addFavorite, addSingleProductToCart, getAllProducts } from "../../../../services/slices/productsSlice"
import userEvent from "@testing-library/user-event"
import CarrouselImages from "../singleProduct/components/CarrouselImages"
import ArrowSlider from "../singleProduct/components/ArrowSlider"
import PhotoCollection from "../singleProduct/components/PhotoCollection"
import CarrouselSingleProduct from "../singleProduct/components/CarrouselSingleProduct"
import FavoriteComponent from "../product/components/FavoriteComponent"
import ProductPrice from "../singleProduct/components/ProductPrice"
import currency from "../../../helpers/calcCurrency"
import QuantityProducts from "../singleProduct/components/QuantityProducts"
import Product from "../product/Product"

describe("Main section", () => {
  test("Should render all products", () => {

    const store = setupStore()

    store.dispatch(getAllProducts())

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <AllProducts />
      </MemoryRouter>,
      {
        store
      }
    )

    const allProductsPerPage = screen.getAllByTestId("product")
    const allProductsSection = screen.getByTestId("all-products")

    expect(allProductsSection).toBeInTheDocument()
    expect(allProductsPerPage.length).toBe(12)
  })

  test("Should render collection products", () => {

    const store = setupStore()

    store.dispatch(getAllProducts())

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Collection />
      </MemoryRouter>,
      {
        store
      }
    )

    const allProductsPerPage = screen.getAllByTestId("product")
    const allProductsSection = screen.getByTestId("collection")

    expect(allProductsSection).toBeInTheDocument()
    expect(allProductsPerPage.length).toBe(12)
  })

  test("Should render men products", () => {

    const store = setupStore()

    store.dispatch(getAllProducts())

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <MenSection />
      </MemoryRouter>,
      {
        store
      }
    )

    const allProductsPerPage = screen.getAllByTestId("product")
    const allProductsSection = screen.getByTestId("menSection")

    expect(allProductsSection).toBeInTheDocument()
    expect(allProductsPerPage.length).toBe(12)
  })

  test("Should render women products", () => {

    const store = setupStore()

    store.dispatch(getAllProducts())

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <WomenSection />
      </MemoryRouter>,
      {
        store
      }
    )

    const allProductsPerPage = screen.getAllByTestId("product")
    const allProductsSection = screen.getByTestId("womenSection")

    expect(allProductsSection).toBeInTheDocument()
    expect(allProductsPerPage.length).toBe(12)
  })

  test("Should render offer products", () => {

    const store = setupStore()

    store.dispatch(getAllProducts())

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Offers />
      </MemoryRouter>,
      {
        store
      }
    )

    const allProductsPerPage = screen.getAllByTestId("product")
    const allProductsSection = screen.getByTestId("offerProducts")

    expect(allProductsSection).toBeInTheDocument()
    expect(allProductsPerPage.length).toBe(12)
  })

  test("Should render product general component", () => {

    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Product product={data[1]} />
      </MemoryRouter>,
    )

    const productContainer = screen.getByTestId("product")
    const productPhoto = screen.getByAltText("photo")
    const productDiscount = screen.getByText(`${data[1].discount}%`)
    const productName = screen.getByText(data[1].name)
    const productPrice = screen.getByText(currency(data[1].price * (1 - data[1].discount/100)))
    const productOldPrice = screen.getByText(currency(data[1].price))

    expect(productContainer).toBeInTheDocument()
    expect(productPhoto).toBeInTheDocument()
    expect(productDiscount).toBeInTheDocument()
    expect(productName).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
    expect(productOldPrice).toBeInTheDocument()
  })
})

describe("Single product section", () => {

  const imagePlced = { place: 0, start: 0, end: 0}

  const images = [data[0].image1,data[0].image2, data[0].image3, data[0].image4,data[0].image5, data[0].image6, data[0].image7, data[0].image8, data[0].image9].filter(elem => elem !== '')

  test("Should render single product", () => {

    const preloadedState = {
      products: {
        products: [],
        status: 'idle',
        error: null,
        singleProduct: {
          id: '01841a99-a363-4aa4-ae0e-396de1aa39d5',
          name: 'Multix Shoes',
          price: 56,
          discount: 0,
          currency: 'USD',
          availability: 'InStock',
          color: 'Yellow',
          idCategory: 1,
          idLocation: 1,
          breadcrumbs: 'Women/Shoes',
          description: 'This product is made with recycled content as part of our ambition to end plastic waste. 20% of pieces used to make the upper are made with minimum 50% recycled content.',
          brand: 'adidas',
          image1: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/f17f8b11e537477e9edaad1e009fbe90_9366/Multix_Shoes_Yellow_H02975_01_standard.jpg', 
          image2: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/d818fcbbe20d468fb397ad1e009fe081_9366/Multix_Shoes_Yellow_H02975_02_standard_hover.jpg',
          image3: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/d6294fed52a9458391dbad1e009ffee7_9366/Multix_Shoes_Yellow_H02975_03_standard.jpg', 
          averageRating: 0,
          image4: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/41026ab712094a579b88ad1e00a01bb2_9366/Multix_Shoes_Yellow_H02975_04_standard.jpg', 
          image5: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/b171c84fe2e9429f8814ad1e00a0381f_9366/Multix_Shoes_Yellow_H02975_05_standard.jpg', 
          image6: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/e86b390305f14674941cad1e009fc6a5_9366/Multix_Shoes_Yellow_H02975_06_standard.jpg', 
          image7: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/d7f2ad558d2e4539b571ad1e00a09037_9366/Multix_Shoes_Yellow_H02975_09_standard.jpg', 
          image8: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/37398062aeb74693a582ad1e00a056bf_9366/Multix_Shoes_Yellow_H02975_41_detail.jpg',   
          image9: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/debdfd1600fa4d0fa9adad1e00a072f7_9366/Multix_Shoes_Yellow_H02975_42_detail.jpg',   
          favorite: false,
          quantity: 0
        },
        favoriteProducts: [],
        cartProducts: []
      },
      validation: { section: '' },
      shoppings: { shoppings: [] }
    }

    const {store} = renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <SingleProduct />
      </MemoryRouter>,
      {
        preloadedState
      }
    )

    const productContainer = screen.getByTestId("productContainer")
    const productPhotoSection = screen.getByTestId("productPhotoSection")
    const productInfoSection = screen.getByTestId("productInfoSection")
    const productQuantitySection = screen.getByTestId("productQuantitySection")
    const breadcrumbs = data[0].breadcrumbs.toUpperCase()
    const productBreadcrumbs = screen.getByText(data[0].breadcrumbs)
    const productName = screen.getByRole("heading", { level: 1 })
    const productDescription = screen.getByText(data[0].description)

    expect(productContainer).toBeInTheDocument()
    expect(productPhotoSection).toBeInTheDocument()
    expect(productInfoSection).toBeInTheDocument()
    expect(productQuantitySection).toBeInTheDocument()
    expect(productBreadcrumbs).toBeInTheDocument()
    expect(productName.textContent).toBe(data[0].name)
    expect(productDescription).toBeInTheDocument()
  })

  test("Should render carrousel single product", () => {

    const handleTouch = jest.fn()

    renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <CarrouselImages
          imgPlaced={imagePlced}
          handleTouchEnd={handleTouch}
          handleTouchStart={handleTouch}
          images={images}
          section={''}
        />
      </MemoryRouter>,
    )

    const productPhotoSection = screen.getAllByAltText("product-photo")
    
    expect(productPhotoSection.length).toBe(images.length)
  })

  test("Should render carrousel single product", () => {

    const handleDirection = jest.fn()

    renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <ArrowSlider
          direction={undefined} 
          handleDirection={handleDirection}
          size={40}
        />
      </MemoryRouter>,
    )

    const productPhotoSection = screen.getByAltText("arrow-left-btn")
    
    expect(productPhotoSection).toBeInTheDocument()
  })

  test("Should render photo collection single product", () => {

    const handlePhotoCollection = jest.fn()

    renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <PhotoCollection
          images={images}
          handlePhotoCollection={handlePhotoCollection}
          section={undefined}
          imgPlaced={undefined}
        />
      </MemoryRouter>,
    )

    const productPhotoSection = screen.getAllByAltText("collection-photo")
    
    expect(productPhotoSection.length).toBe(4)
  })

  test("Should move images in carrousel single product", () => {

    const handlePhotoGallery = jest.fn()

    renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <CarrouselSingleProduct
          images={images}
          handleShowPhotoGallery={handlePhotoGallery} 
        />
      </MemoryRouter>,
    )

    const allImages = screen.getAllByAltText('product-photo')
    const rightArrow = screen.getByAltText('arrow-right-btn')

    expect(allImages[0]).toBeInTheDocument()

    userEvent.click(rightArrow)

    expect(allImages[1]).toBeInTheDocument()
  })

  test("Should add favorite product", () => {

    const {store} = renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <FavoriteComponent
          product={data[0]} 
          fillBtn="product-favorite-icon--liked" 
          outLineBtn="product-favorite-icon" 
          name="favoriteProduct"
        />
      </MemoryRouter>,
    )

    const favBtn = screen.getByRole("button")

    userEvent.click(favBtn)
    store.dispatch(addFavorite(data[0]))

    expect({...data[0], favorite: true}).toEqual(store.getState().products.favoriteProducts[0])
  })

  test("Should render product price section", () => {

    renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <ProductPrice
          price={data[1].price}
          discount={data[1].discount}
        />
      </MemoryRouter>,
    )

    const price = screen.getByText(currency(data[1].price - (data[1].price * (data[1].discount/100))))
    const discount = screen.getByText(`${data[1].discount}%`)
    const oldPrice = screen.getByText(currency(data[1].price))

    expect(price).toBeInTheDocument()
    expect(discount).toBeInTheDocument()
    expect(oldPrice).toBeInTheDocument()
  })

  test("Should render product quantity section", () => {

    const {store} = renderWithProviders(
      <MemoryRouter initialEntries={["/product/01841a99-a363-4aa4-ae0e-396de1aa39d5"]}>
        <QuantityProducts
          product={data[1]}
        />
      </MemoryRouter>,
    )

    const btnImageMinus = screen.getByAltText('minus')
    const btnImagePlus = screen.getByAltText('plus')
    const btnImageCart = screen.getByAltText('cart')
    const addToCart = screen.getByText('Add to cart')

    userEvent.click(addToCart)
    store.dispatch(addSingleProductToCart({ ...data[1], quantity: 2 }))

    expect(btnImageMinus).toBeInTheDocument()
    expect(btnImagePlus).toBeInTheDocument()
    expect(btnImageCart).toBeInTheDocument()
    expect(addToCart).toBeInTheDocument()
    expect(store.getState().products.cartProducts[0]).toEqual({ ...data[1], quantity: 2 })
  })
})