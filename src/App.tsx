import { useFieldArray, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from './Stores/store.config'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import './style.css'
import { addPizza, rmvPizza, uptPizza } from "./Stores/Reducers/pizza.reducer"
import { useState } from "react"

type FormInputs = {
  name: string
  ingredients: { name: string }[]
}

function App() {
  const [isUpdate, setisUpdate] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<null | number>(null);
  const pizzas = useSelector((state: RootState) => state.pizzas.value)
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório").min(3, "Nome inválido"),
    ingredients: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Campo obrigatório").min(3, "Nome inválido")
      })
    )
      .min(1, "Você deve informar pelo menos 1 ingrediente")
      .required("Você deve informar pelo menos 1 ingrediente")
  })

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      ingredients: [{ name: '' }],
      name: ""
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  function addIngredient() {
    append({ name: "" })
  }

  function removeIngredient(index: number) {
    remove(index)
  }

  function onSubmit(data: FormInputs) {
    dispatch(isUpdate ? uptPizza({ index: selectedPizza, data }) : addPizza(data))
    reset()
    setisUpdate(false)
  }

  function fillForm(data: FormInputs) {
    setValue("name", data.name)
    setValue("ingredients", data.ingredients)
  }

  return (
    <div>
      <ul>
        {pizzas.map((pizza) => {
          return (
            <>
              <li key={pizza.name}>{pizza.name}</li>
              <ol>
                {pizza.ingredients.map((ingredient) => {
                  return (
                    <li key={ingredient.name}>{ingredient.name}</li>
                  )
                })}
              </ol>

              <div className="controls">
                <a
                  href="#"
                  onClick={() => {
                    dispatch(rmvPizza({ index: pizzas.indexOf(pizza) }))
                  }}
                >
                  Remover
                </a>
                <a
                  href="#"
                  onClick={() => {
                    fillForm(pizza)
                    setisUpdate(true)
                    setSelectedPizza(pizzas.indexOf(pizza))
                  }}
                >
                  Editar
                </a>
              </div>
            </>
          )
        })}
      </ul>

      {isUpdate ? 's' : 'n'}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="f-content">
          <label htmlFor="">Nome</label>
          <input type="text" placeholder="Nome da pizza" {...register("name")} />
          <small>{errors.name?.message}</small>
        </div>

        <div>
          <div className="row">
            <h4>Ingredientes</h4>
            <div>
              <button type="button" onClick={addIngredient}>Adicionar</button>
            </div>
          </div>

          {
            fields.map((field, index) => {
              return (
                <div className="f-content" key={field.id}>
                  <label htmlFor="">Nome</label>
                  <div className="row">
                    <input type="text" placeholder="Nome do ingrediente" {...register(`ingredients.${index}.name`)} />
                    <button type="button" onClick={() => removeIngredient(index)}>remover</button>
                  </div>
                  <small>{errors.ingredients && errors?.ingredients[index]?.name?.message}</small>
                </div>
              )
            })
          }

          <small>{errors.ingredients?.message}</small>
        </div>

        <button type="submit" className="b-submit">Salvar</button>
      </form>
    </div>
  )
}


const style = {
  formContent: {
    display: "flex",
    flexDirection: "column",
    width: "200px"
  }
}

export default App
