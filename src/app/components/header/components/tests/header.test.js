import { screen } from "@testing-library/react"
import MenuHeader from "../MenuHeader"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { renderWithProviders } from "../../../../utils/test-utils"
import { dataTest } from "../../../../utils/test-utils-data"
import SearchBar from "../SearchBar"
import SideSectionHeader from "../SideSectionHeader"
import CartProducts from "../CartProducts"
import { setupStore } from "../../../../../services/store/store"
import { addFavorite, addSingleProductToCart } from "../../../../../services/slices/productsSlice"
import { data } from "../../../../../services/slices/helpers/data-test"
import FavoriteProducts from "../FavoriteProducts"
import ProfileMenu from "../ProfileMenu"
import ShoppingProducts from "../ShoppingProducts"
import dataTicket from "../../../../helpers/dataTicket"
import { addProductToShoppings } from "../../../../../services/slices/shoppingSlice"

describe("Header section",() => {
  test("Should render menu header section movil", () => {
    
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <MenuHeader />
      </MemoryRouter>,
      {
        preloadedState: dataTest
      }
    )

    const showMenuBtn = screen.getByRole('button')

    const listOptions = screen.getAllByRole('listitem')

    expect(listOptions.length).toBe(5)
    
    userEvent.click(showMenuBtn)

    const showCloseBtn = screen.getByRole('button')

    expect(showCloseBtn).toBeInTheDocument()
    expect(listOptions.length).toBe(5)
  })

  test("Should type and submit the search correctly", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <SearchBar />
      </MemoryRouter>,
      {
        preloadedState: dataTest
      }
    )

    const input = screen.getByRole('textbox')
    const submitBtn = screen.getByRole('button')

    await userEvent.type(input, 'shoes')

    expect(input).toHaveValue('shoes')
    expect(submitBtn).toBeInTheDocument()
  })

  test("Should render two buttons", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <SideSectionHeader />
      </MemoryRouter>,
      {
        preloadedState: dataTest
      }
    )

    const input = screen.getAllByRole('button')

    expect(input.length).toBe(2)
  })

  describe("Should render cart section properly", () => {
    test("Should render cart modal", () => {

      const handleCloseBtn = jest.fn()
      const store = setupStore()
      store.dispatch(addSingleProductToCart({...data[1], quatity: 2}))
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <CartProducts handleCloseBtn={handleCloseBtn} />
        </MemoryRouter>,
        {
          store
        }
      )
  
      const input = screen.getByText("Cart")
      const closeBtn = screen.getByTestId('closeBtn')
      const checkout = screen.getByTestId('checkout')
  
      const products = screen.getByTestId("cartProducts")
      const altProductPhoto = screen.getByAltText('product-cart-photo')
      const altProductTrash = screen.getByAltText('trash-product-cart')
      const nameProduct = screen.getByText(`${data[1].name}`)
  
      expect(input).toBeInTheDocument()
      expect(closeBtn).toBeInTheDocument()
      expect(checkout).toBeInTheDocument()
      expect(products).toBeInTheDocument()
      expect(altProductPhoto).toBeInTheDocument()
      expect(altProductTrash).toBeInTheDocument()
      expect(nameProduct).toBeInTheDocument()
    })

    test("Should render empty cart section", () => {
      const handleCloseBtn = jest.fn()
      const store = setupStore()
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <CartProducts handleCloseBtn={handleCloseBtn} />
        </MemoryRouter>,
        {
          store
        }
      )

      const closeBtn = screen.getByTestId('closeBtn')
      const checkout = screen.queryByTestId('checkout')
      const products = screen.queryByTestId("cartProducts")
      const shopping = screen.queryByTestId("shopping")
      const emptyText = screen.getByText(/Your cart is empty/i)

      expect(closeBtn).toBeInTheDocument()
      expect(checkout).not.toBeInTheDocument()
      expect(products).not.toBeInTheDocument()
      expect(shopping).not.toBeInTheDocument()
      expect(emptyText).toBeInTheDocument()
    })

    test("Should render complete cart modal", async () => {

      const handleCloseBtn = jest.fn()
      const store = setupStore()
      store.dispatch(addSingleProductToCart({...data[1], quatity: 2}))
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <CartProducts handleCloseBtn={handleCloseBtn} />
        </MemoryRouter>,
        {
          store
        }
      )
  
      const input = screen.getByText(/Cart/i)
      const closeBtn = screen.getByTestId('closeBtn')
      const checkout = screen.getByTestId('checkout')
      const shopping = screen.queryByTestId('shopping')

      expect(checkout).toBeInTheDocument()
      expect(shopping).not.toBeInTheDocument()
  
      await userEvent.click(checkout)

      const showShopping = screen.getByTestId('shopping')

      expect(showShopping).toBeInTheDocument()
      expect(checkout).not.toBeInTheDocument()
  
      expect(input).toBeInTheDocument()
      expect(closeBtn).toBeInTheDocument()
    })

    test("Should delete cart product", async () => {

      const handleCloseBtn = jest.fn()
      const store = setupStore()
      store.dispatch(addSingleProductToCart({...data[1], quatity: 2}))
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <CartProducts handleCloseBtn={handleCloseBtn} />
        </MemoryRouter>,
        {
          store
        }
      )
  
      const input = screen.getByText("Cart")
      const products = screen.getByTestId("cartProducts")
      const altProductTrash = screen.getByAltText('trash-product-cart')
      const nameProduct = screen.getByText(`${data[1].name}`)

      await userEvent.click(altProductTrash)
  
      expect(input).toBeInTheDocument()
      expect(products).not.toBeInTheDocument()
      expect(altProductTrash).not.toBeInTheDocument()
      expect(nameProduct).not.toBeInTheDocument()

    })
  })

  test("Should render profil menu", () => {
      const store = setupStore()
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <ProfileMenu />
        </MemoryRouter>,
        {
          store
        }
      )

      const container = screen.getByTestId("profile-menu-container")
      const authorName = screen.getByText(/Andres Marquez/i)
      const listItems = screen.getAllByRole("listitem")

      expect(container).toBeInTheDocument()
      expect(authorName).toBeInTheDocument()
      expect(listItems.length).toBe(3)
  })

  describe("Should render favorite section properly", () => {
    test("Should render favorite modal", () => {

      const handleCloseBtn = jest.fn()
      const store = setupStore()
      store.dispatch(addFavorite({...data[1]}))
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <FavoriteProducts handleCloseBtn={handleCloseBtn} />
        </MemoryRouter>,
        {
          store
        }
      )
  
      const title = screen.getByText("Favorites")
      const closeBtn = screen.getByTestId('closeBtn')
  
      const productsContainer = screen.getByTestId("favoriteProductsContainer")
      const products = screen.getByTestId("favoriteProducts")

      const altProductPhoto = screen.getByAltText('product-favorite')
      const altProductTrash = screen.getByTestId('trash-product-fav')
      const nameProduct = screen.getByText(`${data[1].name}`)
  
      expect(title).toBeInTheDocument()
      expect(closeBtn).toBeInTheDocument()
      expect(products).toBeInTheDocument()
      expect(productsContainer).toBeInTheDocument()
      expect(altProductPhoto).toBeInTheDocument()
      expect(altProductTrash).toBeInTheDocument()
      expect(nameProduct).toBeInTheDocument()
    })

    test("Should render empty favorite section", () => {
      const handleCloseBtn = jest.fn()
      const store = setupStore()
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <FavoriteProducts handleCloseBtn={handleCloseBtn} />
        </MemoryRouter>,
        {
          store
        }
      )

      const title = screen.getByText("Favorites")
      const closeBtn = screen.getByTestId('closeBtn')
  
      const products = screen.queryByTestId("favoriteProducts")

      const message = screen.getByText(/You don't have favorite products/i)

      expect(title).toBeInTheDocument()
      expect(closeBtn).toBeInTheDocument()
      expect(products).not.toBeInTheDocument()
      expect(message).toBeInTheDocument()
    })

    test("Should delete favorite product", async () => {

      const handleCloseBtn = jest.fn()
      const store = setupStore()
      store.dispatch(addFavorite({...data[1]}))
  
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <FavoriteProducts handleCloseBtn={handleCloseBtn} />
        </MemoryRouter>,
        {
          store
        }
      )
      const products = screen.queryByTestId("favoriteProducts")
      const altProductTrash = screen.queryByTestId('trash-product-fav')
      const nameProduct = screen.queryByText(`${data[1].name}`)
  
      expect(products).toBeInTheDocument()
      expect(altProductTrash).toBeInTheDocument()
      expect(nameProduct).toBeInTheDocument()

      await userEvent.click(altProductTrash)

      expect(products).not.toBeInTheDocument()
      expect(altProductTrash).not.toBeInTheDocument()
      expect(nameProduct).not.toBeInTheDocument()
    })
  })

  test("Should render shopping section properly", async () => {

    const handleCloseBtn = jest.fn()
    const store = setupStore()

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <ShoppingProducts handleCloseBtn={handleCloseBtn} />
      </MemoryRouter>,
      {
        store
      }
    )
    const shoppingContainer = screen.getByTestId("shopping-container")
    const title = screen.getByText(/Shopping/)
    const emptyMessage = screen.queryByText(/You don't have shopping yet/i)

    expect(emptyMessage).toBeInTheDocument()
    expect(shoppingContainer).toBeInTheDocument()
    expect(title).toBeInTheDocument()

    await store.dispatch(addProductToShoppings(dataTicket([data[1], data[2]])))

    const shoppingPhoto = screen.getByAltText("shopping-photo")
  
    const ticket = store.getState()
    const ticketNumber = screen.getByText(`Ticket: ${ticket.shoppings.shoppings[0].ticket}`)
    const ticketAmount= screen.getByText(`Total Amount: $${ticket.shoppings.shoppings[0].amount}`)

    expect(emptyMessage).not.toBeInTheDocument()
    expect(shoppingPhoto).toBeInTheDocument()
    expect(ticketNumber).toBeInTheDocument()
    expect(ticketAmount).toBeInTheDocument()
  })
})