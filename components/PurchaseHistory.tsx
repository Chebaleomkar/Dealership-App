"use client"
import { useBills } from '@/hooks/useBills'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShoppingBag } from "lucide-react"
import Image from 'next/image'

const PurchaseHistory = () => {
    const { data:billData, loading, error } = useBills()
    console.log(billData)
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error loading purchase history. Please try again later.
            </div>
        )
    }

    if (!billData || billData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-600">No purchase history found.</p>
            </div>
        )
    }
    if (!Array.isArray(billData) || billData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-600">No purchase history found.</p>
            </div>
        )
    }
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            {billData?.map((bill:any, i) => (
                <Card key={i} className='m-3'>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Purchase History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <h3 className="font-semibold">Customer Details</h3>
                                <p>{bill.customerName}</p>
                                <p>{bill.email}</p>
                                <p>{bill.phoneNo}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Bill Details</h3>
                                <p>Bill No: {bill.billNo}</p>
                                <p>Date: {new Date(bill.createdAt).toLocaleDateString()}</p>
                                <p>Total Amount: ₹{bill.totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                       {bill.barcode && 
                        <Image src={bill?.barcode} 
                        width={100} height={100} 
                         className='w-full h-10' 
                         alt="barcode" />}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Serial Number</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Warranty</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bill.products.map((product:any) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.productName}</TableCell>
                                        <TableCell>{product.serialNumbers}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>₹{product.price.toLocaleString()}</TableCell>
                                        <TableCell>₹{product.totalPrice.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal">
                                                {new Date(product.warrantyStart).toLocaleDateString()} - {new Date(product.warrantyEnd).toLocaleDateString()}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default PurchaseHistory