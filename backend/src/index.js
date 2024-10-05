import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
 dotenv.config({
    path: "./.env"
 })


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());



// app.listen(process.env.PORT || 8000, ()=>{
//     console.log(`Server is running at port : ${process.env.PORT}`);
    
// })

connectDB()
.then(()=>{

    app.on("error", (error) => {
        console.log("App-level error: ", error);
        throw error;
    });

    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB connection faliure!! ", err);
    
})

