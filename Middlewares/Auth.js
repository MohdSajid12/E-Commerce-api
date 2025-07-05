import jwt from 'jsonwebtoken'
import {User} from "../Models/User.js";

export const isAuthenciated = async (req,res,next)=>{
      
       const token = req.header('Auth');

       if(!token) res.status(404).json({message : "Login first" , success : false});

       const decoded = jwt.verify(token ,process.env.JWT);

       const id = decoded.userId;

       let user = await User.findById(id);

       if(!user){
        res.status(404).json({
            message : "User not find",
            success : false
        })
       }

       req.user = user;
       next();

}