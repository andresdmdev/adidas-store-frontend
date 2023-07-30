import { data } from "../slices/helpers/data-test";
import productsSlice, {
  addFavorite, 
  resetCart,
  deleteProductCart,
  deleteQuantityProduct,
  addSingleProductToCart
} from "../slices/productsSlice";

const INITIAL_STATE = {
  products: data,
  status: 'idle',
  error: null,
  singleProduct: {},
  favoriteProducts: [],
  cartProducts: [],
}

describe('Product Slice', () => {
  test('Should return the initial state', () => {
    expect(productsSlice(undefined, { type: undefined })).toEqual(INITIAL_STATE)
  })

  test('Should add or remove products from favorites', () => {

    const validateFavorite = (fav) => {
     return [{...data[0], favorite: fav}, ...data.slice(1)]
    }

    expect(productsSlice(INITIAL_STATE, addFavorite(data[0]))).toEqual(
      {
        products: validateFavorite(true),
        status: 'idle',
        error: null,
        singleProduct: {},
        favoriteProducts: [{...data[0], favorite: true}],
        cartProducts: [],
      }
    )

    const actualState = {
      ...INITIAL_STATE,
      products: validateFavorite(true),
      favoriteProducts: [{...data[0], favorite: true}]
    }

    expect(productsSlice(actualState, addFavorite(data[0]))).toEqual(
      {
        products: validateFavorite(false),
        status: 'idle',
        error: null,
        singleProduct: {},
        favoriteProducts: [],
        cartProducts: [],
      }
    )
  })

  test('Should add products to cart', () => {

    // The parameter that we submit has to contain the quantity of the products
    expect(productsSlice(INITIAL_STATE, addSingleProductToCart({...data[0], quantity: 2}))).toEqual(
      {
        products: data,
        status: 'idle',
        error: null,
        singleProduct: {},
        favoriteProducts: [],
        cartProducts: [{...data[0], quantity: 2}],
      }
    )
  })

  test('Should remove product to cart', () => {

    expect(productsSlice(INITIAL_STATE, deleteProductCart(data[0].id))).toEqual(
      {
        products: data,
        status: 'idle',
        error: null,
        singleProduct: {},
        favoriteProducts: [],
        cartProducts: [],
      }
    )
  })

  test('Should reset cart', () => {

    // The parameter that we submit has to contain the quantity of the products
    
    const productInTheCart = {
      products: data,
      status: 'idle',
      error: null,
      singleProduct: {},
      favoriteProducts: [],
      cartProducts: [{...data[0], quantity: 1}, {...data[2], quantity: 3}],
    }

    expect(productsSlice(productInTheCart, resetCart())).toEqual(
      {
        products: data,
        status: 'idle',
        error: null,
        singleProduct: {},
        favoriteProducts: [],
        cartProducts: [],
      }
    )
  })
})