import user  from "../models/user";
import jwt from "jsonwebtoken"
import asynchandler from "../services/asynchandler";
import customError from "../utils/customError";
import config from "../config/index";
import { token } from "morgan";

export const isLoggedIn = asynchandler(async(req,res,next)=>{
    if(req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]

    }
    if(!token ){
        throw new customError('not authorized to access the root',401)
    }
    try {
       const decodedJwtPayLoad=  jwt.verify(token,config.JWT_SECRET)
        // _id, find the user based on id , set this in req.user
        user.findById(decodedJwtPayLoad._id, "name email role")
        next()
    } catch (error) {
        throw new customError('not authorized to access the root',401)
    }


})

