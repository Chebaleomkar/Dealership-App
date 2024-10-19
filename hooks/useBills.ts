import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "@/types/Product"

export const useBills = () => {
    const [data, setData] = useState<Product[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/bill")
                setData(response.data.bills) 
                setError(null) 
            } catch (error) {
                setError("Failed to fetch products. Please try again.")
                setData(null) 
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return { data, loading, error }
}
