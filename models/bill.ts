import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        customerId :{
            type:String,
            required:true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        billNo:{
            type:String,
            required:true,
            unique:true
        },
        products: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                productName: {
                    type: String,
                    required: true,
                },
                serialNumbers: {
                    type: String,
                    required: true,
                    unique: true
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                totalPrice: {
                    type: Number,
                    required: true,
                },
                warrantyStart: {
                    type: Date,
                    required: true,
                },
                warrantyEnd: {
                    type: Date,
                    required: true,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const BillModel = mongoose.models.Bill || mongoose.model("Bill", billSchema);

export default BillModel;
