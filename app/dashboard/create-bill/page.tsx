"use client"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {  Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/Heading"

interface Product {
  productId: string
  productName: string
  price: number
  warrantyPeriodMonths: number
}

interface SelectedProduct {
  productId: string
  productName: string
  quantity: number
  price: number
  totalPrice: number
  warrantyStart: Date
  warrantyEnd: Date
}

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  phoneNo: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  products: z.array(
    z.object({
      productId: z.string().min(1, "Please select a product"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      warrantyStart: z.date(),
      warrantyEnd: z.date(),
    })
  )
  .min(1, "At least one product must be selected."),
})

export default function BillForm() {
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "omkar",
      phoneNo: "9356875618",
      email: "reddyrushi427@gmail.com",
      products: [],
    },
  })

  useEffect(() => {
    // Simulated product fetching from API
    const products: Product[] = [
      { productId: "1", productName: "Samsung 8GB DDR4 RAM", price: 3000, warrantyPeriodMonths: 24 },
      { productId: "2", productName: "Samsung SSD 256GB", price: 4000, warrantyPeriodMonths: 36 },
    ]
    setAvailableProducts(products)
  }, [])

  const addProduct = () => {
    setSelectedProducts([...selectedProducts, {
      productId: "",
      productName: "",
      quantity: 1,
      price: 0,
      totalPrice: 0,
      warrantyStart: new Date(),
      warrantyEnd: new Date()
    }])
  }

  const handleProductChange = (index: number, field: string, value) => {
    const updatedProducts = [...selectedProducts]
    if (field === "productId") {
      const product = availableProducts.find((p) => p.productId === value)
      if (product) {
        const warrantyEndDate = new Date()
        warrantyEndDate.setMonth(warrantyEndDate.getMonth() + product.warrantyPeriodMonths)
        updatedProducts[index] = {
          productId: product.productId,
          productName: product.productName,
          quantity: updatedProducts[index].quantity,
          price: product.price,
          totalPrice: updatedProducts[index].quantity * product.price,
          warrantyStart: new Date(),
          warrantyEnd: warrantyEndDate,
        }
      }
    } else if (field === "quantity") {
      updatedProducts[index].quantity = value
      updatedProducts[index].totalPrice = value * updatedProducts[index].price
    }
    setSelectedProducts(updatedProducts)
  }

  const removeProduct = (index: number) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index)
    setSelectedProducts(updatedProducts)
  }

  useEffect(() => {
    const total = selectedProducts.reduce((sum, product) => sum + product.totalPrice, 0)
    setTotalAmount(total)
  }, [selectedProducts])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Bill Created", { ...values, selectedProducts, totalAmount })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Heading title='Create Bill' description='generate bill for customer' />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Bill</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Products</h3>
                  <Button type="button" onClick={addProduct}>Add Product</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 font-semibold">
                  <div className="md:col-span-2">Product</div>
                  <div>Quantity</div>
                  <div>Price</div>
                  <div>Total</div>
                  <div>Actions</div>
                </div>
                {selectedProducts.map((product, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <Select
                        value={product.productId}
                        onValueChange={(value) => handleProductChange(index, "productId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Product" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProducts.map((prod) => (
                            <SelectItem key={prod.productId} value={prod.productId}>
                              {prod.productName} - ₹{prod.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value))}
                        min={1}
                      />
                    </div>
                    <div>₹{product.price}</div>
                    <div>₹{product.totalPrice}</div>
                    <div>
                      <Button variant="destructive" size="icon" onClick={() => removeProduct(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Total Amount</h3>
                <p className="text-2xl font-bold">₹{totalAmount}</p>
              </div>

              <Button type="submit" className="w-full">Create Bill</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}