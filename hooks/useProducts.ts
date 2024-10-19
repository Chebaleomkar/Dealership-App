import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "@/types/Product"

export const useProducts = () => {
    const [data, setData] = useState<Product[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products")
                setData(response.data) // Assuming the response contains the product array
                setError(null) // Reset error in case of a successful fetch
            } catch (error) {
                setError("Failed to fetch products. Please try again.")
                setData(null) // Reset data on error
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return { data, loading, error }
}
