import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Route protection middleware
export const protect = asyncHandler(async (req, res, next) => {
  if (!req.session.siwe) {
    res.status(401);
    throw new Error("Not authorized, Invalid session");
  } else {
    const address = req.session.siwe.address;
    const user = await User.findOne({ walletAddress: address });
    req.user = user;
    next();
  }
});

export {protect};