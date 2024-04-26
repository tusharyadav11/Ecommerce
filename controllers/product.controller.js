import Product from '../models/product'
 import formidable  from 'formidable'
import fs from 'fs'
import {s3FileUpload,s3deletefile} from '../services/ImageUpload'
import  Mongoose  from "mongoose"
import asynchandler from '../services/asynchandler'
import customError from '../utils/customError'

export const addProduct = asynchandler(async (req,res)=>{
    const form= formidable({
        multiples: true,
        keepExtensions: true,
    })
})