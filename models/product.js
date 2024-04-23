import mongoose from "mongoose";

 const productSchema = new mongoose.Schema({
    name: {
        typeof: String,
        required: [true,"it is required to fill the product name "],
        trim: true,
        maxLength: [50,"The length of the product name should not exceed the limit of 50 characters"]
    },
    price: {
        typeof: Number,
        required: [true,"it is required to fill the product price "],
        maxLength: [5,"The length of the product price should not exceed the limit of 5 digits"]
    },
    description : {
            typeof: String,

    },
    photos: [
        {
            secure_url : {
                typeof: String,
                required: true
            }
        }
    ],
    stock : {
        typeof : Number,
        default: 0,

    },
    sold : {
        typeof : Number,
        default: 0,
    },
     collectionId: {
        typeof: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
     }
    
 }
,{
    timestamps: true
})
 export default mongoose.model("Products",productSchema)
