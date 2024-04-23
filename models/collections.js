import mongoose, { model }  from "mongoose";
const collectionSchema = new mongoose.Schema({

    name: {
        typeof : String,
        required: [true, "please provide a category name "],
        trim: true,
        maxLength: [50,"maximum length of characters cannot be more than 50 "]

    },

},{
    timestamps: true
})
export default mongoose.model("Collection",collectionSchema)