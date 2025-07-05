import express from 'express';
import mongoose  from 'mongoose';
import bodyParser from  "express";
import userRouter from "./Routes/user.js"
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js"

import {config} from "dotenv";

const app = express();

app.use(bodyParser.json())

config({path:".env"})

app.get("/" ,(req,res)=>{
    res.json({message : "this is home route working"});
})

app.use("/api/user" ,userRouter);    //user Routes
app.use("/api/product" , productRouter)   //product routes
app.use("/api/cart" , cartRouter)   //cart routes

mongoose.connect(process.env.MONGO_URI ,{
     dbName : "e-commerce-api"
}) .then(()=>{
    console.log("Mongo db connected");
}).catch((err)=>{
    console.log(err);
})

const port = process.env.PORT;

app.listen(port ,()=>{
   console.log(`server is running on port ${port}`);
})