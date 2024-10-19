"use client"; // Use client-side rendering

import axios from 'axios';
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/Heading";
import { useProducts } from "@/hooks/useProducts"; // Import the custom hook

// Form Schema
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
      _id: z.string().min(1, "Please select a product"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      warrantyStart: z.date(),
      warrantyEnd: z.date(),
      warrantyPeriodMonths : z.number(),
      category : z.string()
    })
  ),
});

export default function BillForm() {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const { data: availableProducts, loading, error } = useProducts(); // Use the hook to fetch products

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "Sumit Bubane ",
      phoneNo: "1599634587",
      email: "sumit@gmail.com",
      products: [],
    },
  });

  const addProduct = () => {
    setSelectedProducts([...selectedProducts, {
      _id: "",
      productName: "",
      quantity: 1,
      price: 0,
      totalPrice: 0,
      warrantyStart: new Date(),
      warrantyEnd: new Date(),
      warrantyPeriodMonths : 0,
      category:'',
    }]);
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...selectedProducts];

    if (field === "_id") {
      const product = availableProducts?.find((p) => p._id === value);
      if (product) {
        const warrantyEndDate = new Date();
        warrantyEndDate.setMonth(warrantyEndDate.getMonth() + product.warrantyPeriodMonths);
        updatedProducts[index] = {
          _id: product._id,
          productName: product.name,
          quantity: updatedProducts[index].quantity,
          price: product.price,
          totalPrice: updatedProducts[index].quantity * product.price,
          warrantyStart: new Date(),
          warrantyEnd: warrantyEndDate,
          warrantyPeriodMonths : product.warrantyPeriodMonths,
          category : product.category
        };
      }
    } else if (field === "quantity") {
      updatedProducts[index].quantity = value;
      updatedProducts[index].totalPrice = value * updatedProducts[index].price;
    }

    setSelectedProducts(updatedProducts);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

  useEffect(() => {
    const total = selectedProducts.reduce((sum, product) => sum + product.totalPrice, 0);
    setTotalAmount(total);
  }, [selectedProducts]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedProducts.length === 0) {
      alert(`Please add at least one product to the bill.`);
      return;
    }

    // Prepare the final payload
    const payload = {
      customerName: values.customerName,
      phoneNo: values.phoneNo,
      email: values.email,
      products: selectedProducts.map(product => ({
        _id: product._id,
        quantity: product.quantity,
        warrantyStart: product.warrantyStart,
        warrantyEnd: product.warrantyEnd,
        productName: product.productName, // Add productName for the API
        price: product.price,
        totalPrice: product.totalPrice,
        warrantyPeriodMonths : product.warrantyPeriodMonths,
        category : product.category
      })),
    };

    try {
      // Make the API call using axios
      const res = await axios.post('/api/bill', payload); // Added '/api' to match your endpoint

      if (res.status === 200 || res.status === 201) {
        alert('Bill created successfully!');
        // Optionally reset form or clear selected products here
      } else {
        alert(`Failed to create bill. Status code: ${res.status}`);
      }
    } catch (error) {
      console.error('Error submitting bill:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Heading title='Create Bill' description='Generate bill for customer' />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Bill</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Customer Details */}
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

              {/* Product Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Products</h3>
                  <Button type="button" onClick={addProduct}>Add Product</Button>
                </div>

                {loading && <p>Loading products...</p>}
                {error && <p>Error loading products: {error}</p>}

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
                        value={product._id}
                        onValueChange={(value) => handleProductChange(index, "_id", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Product" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProducts?.map((p) => (
                            <SelectItem key={p?._id} value={p?._id}>
                              {p?.name} - {p?.brand} - ₹{p?.price}
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

              {/* Total Amount */}
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
  );
}
