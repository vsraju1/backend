// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'

import express from 'express'
import connectDB from "./db/db.js";

dotenv.config({
    path: './env'
})

connectDB();













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