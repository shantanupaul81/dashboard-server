const mongoose = require('mongoose')
require('dotenv').config()


const URL =process.env.MONGO_URL;

const connectDB = async ()=>{
    mongoose.connect(URL).then(()=>{
        console.log("Database is Connected");
    }).catch((Error)=>{
        console.log('err'+Error);
    })
}

connectDB()