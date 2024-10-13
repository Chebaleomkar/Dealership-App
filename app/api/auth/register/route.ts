import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import { connectDB } from "@/utils/connectDB";

connectDB();
export async function POST(req: NextRequest) {
    try {

        const { shop_name, shop_subtitle, shop_id, imageUrl, GSTIN, address, name, email, password, phoneNumber, } = await req.json();

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new UserModel({
            shop_name,
            shop_subtitle,
            shop_id,
            imageUrl,
            GSTIN,
            address,
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        await newUser.save();

        return NextResponse.json({ message: "User registered successfully!" , newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}
