import Product from '../models/product'
 import formidable  from 'formidable'
import fs from 'fs'
import {s3FileUpload,s3deletefile} from '../services/ImageUpload'
import  Mongoose  from "mongoose"
import asynchandler from '../services/asynchandler'
import customError from '../utils/customError'
import s3 from '../config/s3.config'
import { config } from 'dotenv'

export const addProduct = asynchandler(async (req,res)=>{
    const form= formidable({
        multiples: true,
        keepExtensions: true,
    });
    form.parse(req, async function(err,fields,files)){
        try {
            if(err){
                throw new customError(err.message || "something went wrong ",500)
            }
            let productId= new Mongoose.Types.ObjectId().toHexString(); 

            // checking up for the fields 
            if(!fields.name || !fields.price  || !fields.collectionId || !fields.description ){
                 throw new customError( "something is missing in adding product  ",500)
            }
            // handling images (important part)
            let imageArrayAll = Promise.all(
                Object.keys(files).map(async (filekey,index)=>{
                    const element = files[filekey]
                    const data = fs.readFile(element.filepath)
                    

                    const upload =await  s3FileUpload({
                        bucketName:  config.S3.BUCKET_NAME,
                        key: `products/${productId}/photo_${index+1}.png`,
                        body: data,
                        ContentType: element.mimeType
                    })
                    return {
                        secure_url : upload.Location
                    }
                })
            )
            let imageArray = await imageArrayAll;

            const product = await Product.create({
                _id: productId,
                photos:imageArray,
                ...fields,
            })
             if(!product){
                throw new customError("there is not product made ",400)
             }
             res.status(200).json({
                success: true,
                product
             })



        } catch (error) {
            
        }
    }
})
