import dataTicket from "../../app/helpers/dataTicket"
import { data } from "../slices/helpers/data-test"
import shoppingSlice, { addProductToShoppings } from "../slices/shoppingSlice"

const INITIAL_STATE = {
  shoppings: []
}

describe("Shopping Slice", () => {
  test("Should add product to shopping", () => {

    const ticket = dataTicket([data[0]])

    expect(shoppingSlice(INITIAL_STATE, addProductToShoppings(ticket))).toEqual(
      {
        shoppings: [ticket]
      }
    )
  })
})