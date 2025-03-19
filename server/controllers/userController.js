import { generateNonce, SiweMessage } from "siwe";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// @desc Generate a random nonce
// @routes GET /api/user/generateNonce
// @access Public
export const generateNewNonce = async (req, res) => {
  const nonce = generateNonce();
  const token = jwt.sign({nonce}, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  
  res.cookie("nonce", token, {
    httpOnly: true,
    secure: process.env.ENVIROMENT !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(nonce);
};

// @desc verify if address in siwe message matches admins address
// @route POST /api/user/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  if (!req.body.message) {
    res.status(422);
    throw new Error("Expected siwe message");
  }
  //   admins wallet address
  const address = process.env.ADMIN_ADDRESS;
  //   check is the wallet address passed in siwe message matches admins wallet address
  if (req.body.message.address !== address) {
    res.status(402);
    throw new Error("Authentication failed!");
  }

  const nonce= req.cookies.nonce;
  let decodedNonce;
  if(nonce){
    decodedNonce= jwt.verify(nonce, process.env.JWT_SECRET);
  }


  const SIWEObject=new SiweMessage(req.body.message);
  const {data: message}= await SIWEObject.verify({signature: req.body.signature, nonce: decodedNonce});

  generateToken(res, message);
  res.status(200).json({message: "welcome back"});
});
