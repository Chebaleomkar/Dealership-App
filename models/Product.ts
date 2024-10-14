import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true
        },
        brand:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity:{
            type : Number,
            required:true,
        },
        warrantyPeriodMonths: {
            type: Number,
            required: true, 
        },
        specification:{
            type: String,
            required :true,
            unique:true
        }
    },
    {
        timestamps: true, 
    }
);

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
