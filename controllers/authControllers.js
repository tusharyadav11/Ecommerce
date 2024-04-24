import User from "../models/user";
import asynchandler from '../services/asynchandler'
import customError from '../utils/customError'

export const cookieOptions= {
    expires: new Date(Date.now()+ 3*24*60*60*1000),
    httpOnly: true
    
}