import jwt from "jsonwebtoken";

// sign a jwt token of the siwe message and set it as a cookie
const generateToken = (res, message) => {
  const messageObject = {
    domain: message.domain,
    address: message.address,
    statement: message.statement,
    uri: message.uri,
    version: message.version,
    chainId: message.chainId,
    nonce: message.nonce,
    issuedAt: message.issuedAt,
  };
  const token = jwt.sign(messageObject, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Check later, ISSUE: cookie not being set
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};
export default generateToken;
