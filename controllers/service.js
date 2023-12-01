import ErrorHandler from "../middlewares/error.js";
import {Service} from "../models/service.js"

export const newTask=async(req,res,next)=>{

    try {
        const {title,description}=req.body;

        await Service.create({
            title,description,user:req.user
        });
    
        res.status(201).json({
            success:true,
            message:"Service added successfully"
        })
    } catch (error) {
        next(error);
    }

};

export const getMyTask =async (req,res,next)=>{
    try {
        const userid=req.user._id;

        const service =await Service.find({user:userid});

        res.status(200).json({
            success:true,
            service,
        })
    } catch (error) {
        next(error);
    }
};
export const updateTask =async (req,res,next)=>{

    try {
        const {id}=req.params;
        const service=await Service.findById(id);
        if(!service) 
            return next(new Error("invalid "));
        await service.save(); 

        res.status(200).json({
            success:true,  
            message:"service updated"
        })
        } catch (error) {
            next(error);
        }
};
export const deleteTask =async (req,res,next)=>{
   try {
    const {id}=req.params;
    const service=await Service.findById(id);
    
    if(!service) 
        return next(new ErrorHandler("service not found",404));
    await service.deleteOne();
    res.status(200).json({
        success:true,
        message:"service deleted"
       
    });
   } catch (error) {
    next(error);
   }
};

