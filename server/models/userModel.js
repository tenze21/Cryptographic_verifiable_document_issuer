import mongoose from "mongoose";
import validator from "validator";

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate:{
            validator: validator.isEmail,
            message: "Invalid email format"
        }
    },
    walletAddress:{
        type: String,
        required: [true, "Wallet address is required"],
        unique: true,
        validate:{
            validator: validator.isEthereumAddress,
            message: "Invalid Wallet address"
        }
    }
});
const USER= mongoose.model('User', userSchema);
export default USER;
