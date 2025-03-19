import jwt from "jsonwebtoken";
const generateToken=(res, message)=>{
    console.log(message);
    
    const token= jwt.sign(message, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.ENVIROMENT !== "development",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000,
    })
};
export default generateToken;