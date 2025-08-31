import connectDB from "./db/index.js"   
import cors from "cors"
import dotenv from "dotenv"
import express from "express"



import cookieParser from "cookie-parser"
const app= express()

dotenv.config({
    path:"../.env"
})

app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
}));

app.use(express.json ({}));
app.use(express.urlencoded ({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


export  { app }