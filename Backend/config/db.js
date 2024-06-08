import mongoose from "mongoose";

export const  connectDb=async()=>{
    await mongoose.connect('mongodb+srv://hematwal:jaishreeram1233@cluster0.a8kd6q4.mongodb.net/food-del').then(()=>{
        console.log("db connected")
    })
}