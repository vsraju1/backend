// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import { app } from './app.js';

import express from 'express'
import connectDB from "./db/db.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
)
.catch((error) => {
    console.log(`Db connection is failed ${error}`)
})













/*
const app = express()

;(async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error", (error) => {
        console.log("error: ", error)
        throw error
       })

       app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`)
       })
    } catch (err){
        console.log("Error: " ,err)
        throw err
    }
}
)()
*/