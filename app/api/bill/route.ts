
import BillModel from "@/models/bill";
import CustomerModel from "@/models/Customer";
import { Product } from "@/types/Product";
import { connectDB } from "@/utils/connectDB";
import { generateBarcode } from "@/utils/generateBarCode";
import { generateBillNo } from "@/utils/generateBillNo";
import { generateSerialNumber } from "@/utils/generateSerialNumber";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        await connectDB();
        const bills = await BillModel.find();
        if(!bills){
            return NextResponse.json({message : "No Bills Found"} , {status : 404});
        }
        return NextResponse.json({bills} , {status : 200});
    }catch(error:any){
        return NextResponse.json({ message: 'Internal Server Error'  , error});
    }
}

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { customerName, phoneNo, email, products } = await req.json();
        let barcodeImage;
        // Check if customer exists, if not, create a new customer
        let customer = await CustomerModel.findOne({ email });
        if (!customer) {
            customer = new CustomerModel({ name: customerName, phoneNo, email, billNos: [] });
            await customer.save();
        }

        // Generate Bill Number
        const billNo = generateBillNo();
        customer.billNos.push(billNo);
        await customer.save();

        // Process each product
        const processedProducts = await Promise.all(products.map(async (product: Product, index: number) => {
            const warrantyStart = new Date();
            const warrantyEnd = new Date();
            warrantyEnd.setMonth(warrantyEnd.getMonth() + product.warrantyPeriodMonths);

            // Generate serial number
            const serialNumber = generateSerialNumber({ category: product.category });

            // Generate Barcode for the serial number (inside the map, unique for each product)
            const barcodeImage = generateBarcode(serialNumber); // Generate the barcode as base64

            return {
                ...product,
                serialNumbers: serialNumber, // Add generated serial number
                warrantyStart,
                warrantyEnd,
                barcode: barcodeImage, // Add barcode as base64 image
            };
        }));

        // Calculate total amount
        const totalAmount = processedProducts.reduce((total, product) => total + product.totalPrice, 0);

        // Create Bill and save to DB
        const bill = new BillModel({
            billNo,
            customerId: customer._id,
            customerName,
            phoneNo,
            email,
            products: processedProducts,
            totalAmount,
        });
        await bill.save();
        return NextResponse.json({ message: 'Bill created successfully',barcodeImage ,  bill ,  });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error'  , error});
    }
}
