import mongoose from "mongoose";

 const productSchema = new mongoose.Schema({
    name: {
        typeof: String,
        

    }
 }
,{
    timestamps: true
})
 export default mongoose.model("Products",productSchema)