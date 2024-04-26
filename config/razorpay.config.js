import Razorpay from "razorpay";
import config from './config/index'
import { Config } from "aws-sdk";

export const razorpay = new Razorpay({
    key_id : config.RAZORPAY_KEY_ID ,
    key_secret: Config.RAZORPAY_SECRET_KEY
    
})