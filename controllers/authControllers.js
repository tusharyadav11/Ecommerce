import user from "../models/user";
import User from "../models/user";
import asynchandler from '../services/asynchandler'
import customError from '../utils/customError'

export const cookieOptions= {
    expires: new Date(Date.now()+ 3*24*60*60*1000),
    httpOnly: true
    
 }

 export const signup = asynchandler(async (req,res)=>{
    const {name,email,password} =req.body

    if(!name || !email || !password){
        throw new customError("All the field are required to be filled",400)
      }
      // check if user exists 
     const existingUser=  await User.findOne({email})
     if(existingUser){
        throw new customError("User already exists",400)
     }
     const user = await User.create({
        name,
        email,
        password
     });
     // creating up the token 
     const token = user.getJwtToken()
     user.password= undefined

     res.cookie("token",token,cookieOptions)    // first token is the name of the cookie and second is the 
     // creation of the token ie above it only and third  is cookieoptions 

     res.status().json{
        success: true,
        token,
        user
     }

    
    
    }

 })
