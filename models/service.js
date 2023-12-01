import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


});
export const Service=mongoose.model("Service",schema);

