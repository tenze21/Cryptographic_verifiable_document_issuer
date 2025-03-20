import { generateNonce, SiweMessage } from "siwe";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import USER from "../models/userModel.js";

// @desc Generate a random nonce
// @routes GET /api/user/generateNonce
// @access Public
export const generateNewNonce = async (req, res) => {
  const nonce = generateNonce();

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(nonce);
};

// @desc verify if address in siwe message matches admins address
// @route POST /api/user/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  if (!req.body.message || !req.body.email || !req.body.signature) {
    res.status(422);
    throw new Error("Missing arguments to login");
  }
  const { email, message, signature } = req.body;

  const user = await USER.findOne({ email });
  const SIWEObject = new SiweMessage(message);
  const {data: verifiedMessage}= await SIWEObject.verify({signature: signature, nonce: message.nonce});
  
  //   check is the wallet address passed in siwe message matches admins wallet address
  if (user && verifiedMessage.address === user.walletAddress) {
    generateToken(res, verifiedMessage);
    res.status(200).json(user);
  } else {
    res.status(402);
    throw new Error("Authentication failed!");
  }
});

// @desc remove the jwt token from the cookie
// @route GET /api/user/logout
// @access Public
export const logout= asyncHandler(async (req, res)=>{
  res.clearCookie("jwt");
  res.status(200).json({message: "Logged out successfully"});
});