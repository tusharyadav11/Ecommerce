import mongoose from "mongoose";

const userSchema = mongoose.userSchema(
{
    name: {
        typeof: String,
        required: [true,"Name is required"],
        maxLength: [30,"Length of name should be less than 30 characters"],
        trim:true
    }

}

)