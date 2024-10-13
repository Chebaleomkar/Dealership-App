import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        shop_name: {
            type: String,
            required: true
        },
        shop_subtitle: {
            type: String,
            required: true
        },
        shop_id: {
            type: String,
            require: true
        },
        imageUrl: {
            type: String,
            required: true,
        },
        GSTIN: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
