"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Heading } from '@/components/Heading'
import DashboardContent from '@/components/layout/Dashboard-content'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/hooks/useProducts' // Import the custom hook

const ManageStockPage = () => {
    // Use the custom hook to get products, loading, and error states
    const { data: products, loading, error } = useProducts()

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <DashboardContent>
            <Heading title='Stock' description='Manage stock here' />

            {/* Responsive grid layout for products */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products && products.map((product) => (
                    <Card key={product._id} className="hover:shadow-lg transition-shadow duration-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                            <CardDescription>{product.brand}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Price:</strong> ₹{product.price}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Specs:</strong> {product.specification}</p>
                            <p><strong>Warranty:</strong> {product.warrantyPeriodMonths} months</p>
                        </CardContent>
                        <CardContent>
                            <Button variant="outline" size="sm">Edit</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardContent>
    )
}

export default ManageStockPage
