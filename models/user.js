import mongoose from "mongoose"
import authRoles from "../utils/authRoles"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import crypto from "crypto"
import config from "../config/index"

const userSchema = mongoose.userSchema(
{
    name: {
        typeof: String,
        required: [true,"Name is required"],
        maxLength: [30,"Length of name should be less than 30 characters"],
        trim:true
    },
    email: {
        typeof:String,
        required: [true, "email is required"],
        unique: true
    },
    password:{
        typeof: String,
        required:[true,"password is required"],
        minLength: [8, "length of password should be minimum of 8 characters"],
        select : false
    },
    role:{
        typeof:String,
        enum: Object.values(authRoles),
        default: authRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},
{
    timestamps: true
}
);
// challenge 1 ie to encrypt the password -hooks
userSchema.pre("save", async function(next){
    if(!this.ismodified("password")) return next()
    this.password= await bcrypt.hash(this.password,10)
next()
});

// comparing the enteredpassword of the user to the password in the database
userSchema.methods={
    // compare the password
    comparePassword: async function(enteredpassword){
        return await bcrypt.compare(enteredpassword,this.password)
    },

    // generating jwt token 
    getJwtToken: function(){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role
            },
           config.JWT_SECRET,{
                expiresIn: config.JWT_EXPIRY
            }
        )
    },
    // forget password implementations 
    generateforgotPasswordToken : function(){
        const forgettoken = crypto.randomBytes(20).toString('hex');
        // now there are two steps
        // step 1 - send the token to the database
        this.forgotPasswordToken= crypto.createHash("sha256").update(forgettoken).digest('hex')

        this.forgotPasswordExpiry= Date.now()+ 20*60*1000;
        // and step 2= return the value of the token to the user
             return forgettoken 
    },
}
export default mongoose.model("User",userSchema);
 