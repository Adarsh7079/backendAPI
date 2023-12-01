
import mongoose from 'mongoose';

const schema =new mongoose.Schema({
   firstname:{
    type:String,
    required:true
   },
   lastname:{
    type:String,
    required:true
   },
  email:{
    type:String,
     unique:true
   },
    password:{
        type:String,
        select:false
    }
});

export const User=mongoose.model("Message",schema);
