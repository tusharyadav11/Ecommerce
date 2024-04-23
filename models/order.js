import mongoose from "mongoose";
const orderSchema= new mongoose.Schema({
    products: {
        type:  [
            {
                productId: {
                    typeof: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required:true
                },
                count: Number,
                price: Number

            }
        ],
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    address: {
        typeof: String,
        required: true
    },
    phonenumber : {
        typeof: Number,
        required: true
    },
    amount : {
        typeof: Number,
        required: true
    },
    coupon: String,
transactionId: String    ,
status: {
    typeof: String,
    enum : ["ORDERED","DELIVERED","SHIPPED","CANCELLED"],
    default: "ORDERED"
}

},
{
    timestamps: true
})
export default mongoose.model("Order",orderSchema)