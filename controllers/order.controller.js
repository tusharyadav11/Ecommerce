import Product from '../models/product'
import coupon from '../models/coupon'
import Order from '../models/order'
import asynchandler from '../services/asynchandler'
import customError from '../utils/customError'
import  razorpay from '../config/razorpay.config'

// generate razorpay id 
// controller for generating raZorpay id and 
// cretes a razorpay id for placing up the Order
// razorpay order id is successfull 

export const generateRazorPay = asynchandler(async (req,res)=>{
    // get product and coupon id from frontend 


    //verify product price from the backend 
    //make db query to get all the product and info 
            let totalAmount
    //total amount and final amount 
    //coupon check -db
    // calcualte the discount by having how much discount percent 
    // finalAmount = totalAmount - discount 
    
    const options={
        amount: Math.round(totalAmount*100),
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`   
    }
    const order= await razorpay.orders.create(options)
    // if order does not exist 
    // if yes , send it to the frontend 
    
    

})