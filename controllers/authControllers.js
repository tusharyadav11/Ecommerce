import crypto from "crypto"
import user from "../models/user";
import User from "../models/user";
import asynchandler from '../services/asynchandler'
import customError from '../utils/customError'
import mailhelper from '../utils/mailhelper'  
import { error } from "console";
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

     res.status().json({
        success: true,
        token,
        user
     }) 
 })

export const login = asynchandler(async (req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        return new customError("Both the field are required",400);
    }
  const user =   User.findOne({email}).select("+password")

  if(!user){
    return new customError("you entered the wrong credentials ",400)
  }
  const ismatched = await user.comparePassword(password)
if(!ismatched){
    throw new customError("wrong credentials ",400)
}
    const token = user.getJwtToken()
    user.password= undefined
    res.cookie("token",token,cookieOptions)
    return res.send(200).json({
        success: true,
        user,
        token
    })

})

export const logout = asynchandler(async (req,res)=>{
     res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
     })

     res.status(200).json({
        success: true,
        message: "logged out "
     })
})

export const forgotPassword= asynchandler(async(req,res)=>{
    const {email} = req.body

    const  user = await  User.findOne({email})
    if(!user){
        throw new customError("user is not found ", 404)
    }
    const resettoken = user.generateforgotPasswordToken()
    await user.save({validateBeforeSave : false})

    const resetURL = `${req.protocol}://${req.get("host")}/api/auth/password/reset${resettoken}`
   
   const texturl = `your password url for reset password is \n\n${resetURL}\n\n`
    try {
        await mailhelper ({
            email: user.email,
            subject : "passwrid reset email for website",
            text :texturl ,
        })
        res.status(200).json({
            success: true,
            message : ` email send to ${user.email}`
        })
    } catch (error) {
        // roll back and clear fields and save
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry=  undefined
        throw new customError(err.message || 'email sent failure ',500)
        
    }

})

export const resetpassword = asynchandler(async (req,res)=>{
const {token: resettoken}= req.params
const {password, confirmPassword}= req.body

const resetpasswordtoken=crypto.createHash('sha256').update(resettoken).digest('hex')

const user=await User.findOne({forgotPasswordToken :resetpasswordtoken,
   forgotPasswordExpiry: {$gt : Date.now()}
})
if(!user){
    throw new customError("password token is invalid or expired",400) 
}
if(password!= confirmPassword){
    throw new customError("password and confirmpassword does not match",400)
}
user.password= password 
user.forgotPasswordToken= undefined
user.forgotPasswordExpiry= undefined
await user.save()

// create token and send as response to the user as it is optional
const token = user.getJwtToken()
user.password= undefined

// helper method for the coookie
res.cookie("token",token,cookieOptions)
res.status(200).json({
    success: true,
    user
})

})