import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import { Errors } from "../helpers/Errors"
import { AddProduct } from "../services/ProductService"
import { ProductForm } from "../components/ProductForm"


export async function action({ request }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  let error = ""
  if (Object.values(data).includes("")) {
    return error = "Todos los campos son obligatorios"
  }


  await AddProduct(data)


  return redirect("/")
}

export const NewProduct = () => {

  const error = useActionData() as string



  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registrar Productos </h2>
        <Link to="/"
          className="rounded-md bg-indigo-600 text-white font-bold p-3 text-sm shadow-sm hover:bg-indigo-500"
        >Volver a productos</Link>
      </div>

      {
        error ? <Errors>{error}</Errors> : null
      }

      <Form
        method="post"
        className="mt-10"

      >

        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />

      </Form>
    </>
  )
}
