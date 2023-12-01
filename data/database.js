import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        dbName:"backendAPI",
    }).then(()=>console.log("database connected"))
    .catch((e)=>console.log(e));


}