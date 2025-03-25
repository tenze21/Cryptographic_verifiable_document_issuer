import mongoose from "mongoose";
import validator from "validator";

const userSchema=new mongoose.Schema({
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
