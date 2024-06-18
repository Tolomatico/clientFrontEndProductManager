import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { safeParse, parse, number } from "valibot"
import axios from "axios"
import { z } from "zod";


type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function AddProduct(data: ProductData) {

    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/productos`
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error("Datos inválidos")
        }

    } catch (error) {
        console.log(error)
    }

}

export async function getProducts() {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/productos`
        const { data } = await axios.get(url)

        const result = safeParse(ProductsSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error...")
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product["id"]) {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        const { data } = await axios.get(url)

        const result = safeParse(ProductSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error...")
        }
    } catch (error) {
        console.log(error)
    }
}

function toBoolean(value: string): boolean {
    return value.toLowerCase() === 'true';
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
    try {
        const parsedData = {
            id,
            name: data.name,
            price: parse(number(), Number(data.price)),
            availability: toBoolean(data.availability.toString()),
        }


        const result = safeParse(ProductSchema, parsedData);

        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
        await axios.put(url, result.output);

    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id: Product["id"]) {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        await axios.delete(url)

    } catch (error) {
        console.log(error)
    }

}

export async function updateAvailability(id: Product["id"]) {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`
        await axios.patch(url)

    } catch (error) {
        console.log(error)
    }

}