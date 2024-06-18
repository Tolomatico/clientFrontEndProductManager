import {createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout/Layout"
import  {Products, action as availableAction, loader as productLoader } from "./views/Products"
import { NewProduct , action as newProductAction } from "./views/NewProduct"
import { EditProduct ,loader as editProductLoader, action as editeProductAction } from "./views/EditProduct"
import { action as deleteProductAction } from "./views/ProductDetails"


export const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Products/>,
                loader:productLoader,
                action:availableAction

            },
            {
                path:"productos/nuevo",
                element:<NewProduct/>,
                action:newProductAction
            },
            {
                path:"productos/:id/editar",
                element:<EditProduct/>,
                loader:editProductLoader,
                action:editeProductAction
            },{
                path:"productos/:id/eliminar",
                action:deleteProductAction 
            }

        ]
    }
])