// Express Server-------------------->

import express from "express"
import cors from 'cors'
import { connectDb } from "./config/db.js"
import foodRouter from "./routs/foodRout.js"
import userRouter from "./routs/userRout.js"
import 'dotenv/config'
import cartRouter from "./routs/cartRout.js"
import orderRouter from "./routs/orderRout.js"

// app config---->

const app=express()
const port =4014

// middleware

app.use(express.json())
app.use(cors())

// db connection --->
connectDb();

// api endpoints-->

app.use("/api/food",foodRouter)
app.use("/images",express.static('upload'))

app.use("/api/user",userRouter)

app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API working")

})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})


//mongodb+srv://hematwal:jaishreeram1233@cluster0.a8kd6q4.mongodb.net/?