import CustomerModel from "@/models/Customer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const customers = await CustomerModel.find();
        if(!customers || customers.length==0){
            return NextResponse.json({message : "Customers Not found"})
        }
        return NextResponse.json(customers);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error });
    }
}