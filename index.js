import express from 'express';
import {connectDB} from "./data/database.js"
import userRouter from "./routes/user.js";
import serviceRouter from "./routes/service.js";
import {config} from "dotenv"
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";

const app =express();

config({
    path:"./config.env"
});
connectDB();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));

//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/service",serviceRouter);

const router=express.Router();
app.get("/",(req,res)=>{
    res.send("hello baby");
})

const port =process.env.PORT;
 app .listen(port,()=>{
    console.log(`server is working at ${port} in ${process.env.NODE_ENV} Mode`);
});
app.use((err,req,res,next)=>{
    return res.status(404).json({
        success:false,

        message:err.message,
    })
});

//using error middleware 
app.use(errorMiddleware);