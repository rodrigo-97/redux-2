import { configureStore } from '@reduxjs/toolkit'
import pizzaReducer from './Reducers/pizza.reducer'

export const store = configureStore({
  reducer: {
    pizzas: pizzaReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch