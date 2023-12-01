import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

export const getAllUsers=async (req,res)=>{
   try {
    const users =await User.find({});

    const keyword =req.query.keyword;
    console.log(keyword);

    res.json({
        success:true,
        users,
    });
   } catch (error) {
    next(error);
   }
}



//*******  Login API  ***** */

export const login =async (req,res)=>{
   try {
    const {email ,password}=req.body;

    const user =await User.findOne({email}).select("+password");
    if(!user)   return next(new ErrorHandler("Invalid Email & passwptd not found",400));


    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return next(new ErrorHandler("Invalid Email & passwptd not found",400));

    sendCookie(user,res,`welcome back ${user.firstname}`);

   } catch (error) {
    next(error);
   }
}

//*******  Register API  ***** */
export const register=async(req,res)=>{
   try {
    const {firstname,lastname,email,password}=req.body;
    let user= await User.findOne({email});

     if(user)   return next(new ErrorHandler("userexixit",404));

     const hashedPassword =await bcrypt.hash(password,10);
     user= await User.create({firstname,lastname,email,password:hashedPassword});
     sendCookie(user ,res,"Register Successfully",201);
   } catch (error) {
    next(error);
   }
};

// *******  Get MyProfile API  ***** */
  export  const getMyProfile=(req,res)=>{
        res.status(200).json({
            success:true,
            user:req.user,
        })
   };

   // *******  Get LogOut API  ***** */

   export const logout=(req,res)=>{
        res
        .status(200)
        .cookie("token","",{
            expires:new Date(Date.now()),
            sameSite:process.env.NODE_ENV==="Development" ?"lax":"none",
            secure:process.env.NODE_ENV==="Development" ?false:true,
        }).json({
            success:true,
            user:req.user,
        })
   }
