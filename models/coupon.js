import mongoose, { model, mongo } from "mongoose";

const couponSchema = new mongoose.Schema({
    code:{
        typeof : String,
        required: [true," please enter the coupon code"]
    },
    discount: {
        typeof: Number,
        default : 0
    },
    active: {
        typeof: Boolean,
        default: true
    
    }

},{
    timestamps: true
}
)
export default mongoose.model("coupon",couponSchema)