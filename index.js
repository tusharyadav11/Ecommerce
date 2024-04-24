import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

// create a function for the creation of the database and 
// second function would be to connect it 
// i want to connect to the datbase automatically when the file index.js is run
// this can be achieved by iifi method ie ()()

(async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("database connected successfully ");

        app.on('error',(error)=>{
            console.log("it is error",error);
            throw error
        })
        const onlistening=()=>{
            console.log(`it is running at ${config.PORT}`);
        }

        app.listen(config.PORT,onlistening)

    } catch (error) {
        console.log("error is there ",error);
        throw error 

    }
})()