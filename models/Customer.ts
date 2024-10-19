import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required:true,
        },
        billNos: [{ type: String }]
    },
    {
        timestamps: true,
    }
);

const CustomerModel = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default CustomerModel;
