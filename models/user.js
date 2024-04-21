import mongoose from "mongoose";
import authRoles from "../utils/authRoles";
const userSchema = mongoose.userSchema(
{
    name: {
        typeof: String,
        required: [true,"Name is required"],
        maxLength: [30,"Length of name should be less than 30 characters"],
        trim:true
    },
    email: {
        typeof:String,
        required: [true, "email is required"],
        unique: true
    },
    password:{
        typeof: String,
        required:[true,"password is required"],
        minLength: [8, "length of password should be minimum of 8 characters"],
        select : false
    },
    role:{
        typeof:String,
        enum: Object.values(authRoles),
        default: authRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},
{
    timestamps: true
}

);

export default mongoose.model("User",userSchema);