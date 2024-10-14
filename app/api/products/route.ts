import ProductModel from "@/models/Product";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const products = await ProductModel.find();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, price,brand,quantity, category, warrantyPeriodMonths, specification } = await req.json();

        const newProduct = new ProductModel({
            name,
            brand,
            price,
            quantity,
            category,
            warrantyPeriodMonths,
            specification
        });

        await newProduct.save();

        return NextResponse.json({ message: "Product added successfully!", newProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
    }
}
