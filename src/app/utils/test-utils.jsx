import React from "react";
import validationSlice from "../../services/slices/validationSlice";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { setupStore } from "../../services/store/store";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore({ reducer: { user: validationSlice }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}