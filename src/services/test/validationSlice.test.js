import validationSlice, { section } from "../slices/validationSlice"

const INITIAL_STATE = {
  section: '',
}

describe('Validation Slice', () => {
  test("Should change the section where the user want to go", () => {
    expect(validationSlice(INITIAL_STATE, section('favorite'))).toEqual(
      {
        section: 'favorite'
      }
    )
  })
})