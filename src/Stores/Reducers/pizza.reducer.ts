import { createSlice } from '@reduxjs/toolkit'

const basePizzaIngredients = [
  { name: 'Massa' },
  { name: 'Molho' },
  { name: 'Queijo' }
]

const initialState = {
  value: [
    {
      name: 'Calabresa', ingredients: [
        ...basePizzaIngredients,
        { name: 'Calabresa' },
        { name: 'Cebola' }
      ]
    },
    {
      name: 'Frango', ingredients: [
        ...basePizzaIngredients,
        { name: 'Frango' },
        { name: 'Catupiry' }
      ]
    },
    {
      name: 'Quatro queijos', ingredients: [
        ...basePizzaIngredients,
        { name: 'Provolone' },
        { name: 'Catupiry' }
      ]
    }
  ]
}

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    addPizza: (state, action) => {
      state.value.push({
        ingredients: [...basePizzaIngredients, ...action.payload.ingredients],
        name: action.payload.name
      })
    },

    rmvPizza: (state, action) => {
      state.value.splice(action.payload.index, 1)
    },

    uptPizza: (state, action) => {
      state.value.splice(action.payload.index, 1, action.payload.data)
    },
  }
})

export const { addPizza, rmvPizza, uptPizza } = pizzaSlice.actions

export default pizzaSlice.reducer