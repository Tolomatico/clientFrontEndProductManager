import { formatCurrency } from "../helpers"
import { deleteProduct } from "../services/ProductService"
import { Product } from "../types"
import {ActionFunctionArgs, Form, redirect, useFetcher, useNavigate} from "react-router-dom"

type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {

    if (params.id !== undefined) {
       await deleteProduct(+params.id)
     
        return redirect("/")
      }
  
  }

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  
    const fetcher=useFetcher()
    const navigate=useNavigate()
    const {name,price,availability}=product

    const   isAvailable=availability
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
            {name}
            </td>
            <td className="p-3 text-lg text-gray-800">
            {formatCurrency(price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form   method="POST">
                    <button 
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? "Text-black" : "text-red-600"}
                         rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer `}
                    
                    >
                        {isAvailable ? "Disponible" : "No Disponible"}</button>
                </fetcher.Form>
            
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 align-center">
                    <button 
                    onClick={()=>navigate(`/productos/${product.id}/editar`)}
                    className="bg-indigo-600 text-white w-full text-center font-bold uppercase text-xs p-2 rounded-lg">
                    Editar</button>
                    <Form
                    method="post" className="w-full" action={`productos/${product.id}/eliminar`}
                    onSubmit={(e)=>{
                        if(!confirm("Eliminar producto?")){
                            e.preventDefault()
                        }
                    }} >
                        <input 
                        type="submit"
                        value="Eliminar" 
                        className="bg-indigo-600 text-white w-full text-center font-bold uppercase text-xs p-2 rounded-lg cursor-pointer"
                         />
                        </Form>             
                </div>
            </td>
        </tr>
    )
}

