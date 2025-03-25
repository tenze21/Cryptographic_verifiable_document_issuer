import { generateNonce, SiweMessage } from "siwe";
import asyncHandler from "../middleware/asyncHandler.js";
import USER from "../models/userModel.js";

// @desc Generate a random nonce
// @routes GET /api/user/generateNonce
// @access Public
export const generateNewNonce = async (req, res) => {
  req.session.nonce = generateNonce();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(req.session.nonce);
};

// @desc verify if address in siwe message matches admins address
// @route POST /api/user/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  // throw error if req body doesn't have the siwe message or signature
  if (!req.body.message || !req.body.signature) {
    res.status(422);
    throw new Error("Missing arguments to login");
  }
  const { message, signature } = req.body;
  const SIWEObject = new SiweMessage(message);

  const { data: verifiedMessage } = await SIWEObject.verify({
    signature: signature,
    nonce: req.session.nonce,
  });

  // find the user with the wallet address
  const user = await USER.findOne({ walletAddress: verifiedMessage.address });
  console.log(user);
  

  //   check is the wallet address passed in siwe message matches admins wallet address
  if (user && verifiedMessage.address === user.walletAddress) {
    res.status(200).json(user);
    req.session.siwe= verifiedMessage;
  } else {
    req.session.nonce = null;
    req.session.siwe = null;
    res.status(401);
    throw new Error("Authentication failed!");
  }
});

// @desc remove the jwt token from the cookie
// @route GET /api/user/logout
// @access Public
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});
