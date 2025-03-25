import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Route protection middleware
// Verify jwt token and get user from the database
// set user in req object
export const protect = asyncHandler(async (req, res, next) => {
  let token= req.cookies.jwt;
  if(token){
    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        const address= decoded.address;
        const user= await User.findOne({address});
        req.user= user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
  }else{
    res.status(401);
    throw new Error("Not authorized, token not found");
  }
});