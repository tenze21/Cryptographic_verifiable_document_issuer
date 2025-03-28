import mongoose from "mongoose";
import validator from "validator";

const marksheetSchema= new mongoose.Schema({
    data:{
        student:{
            indexNo:{
                type: String,
                required:[true, "Index number cannot be empty"],
                unique: true,
                trim: true 
            },
            name:{
                type: String,
                required: [true, "Student name cannot be empty"],
            },
            dob:{
                type: Date,
                required: [true, "Date of birth cannot be empty"],
            },
            school:{
                type: String,
                required: [true, "School name cannot be empty"],
            }
        },
        subjects:[
            {
                name:{
                    type: String,
                    required: [true, "Subject name cannot be empty"],
                },
                marks:{
                    type: Number,
                    required: [true, "Marks cannot be empty"],
                }
            }
        ],
        supw:{
            type: String,
            required: [true, "SUPW grade cannot be empty"],
        },
        result:{
            type: String,
            required: [true, "Result cannot be empty"],
        },
        issuedOn:{
            type: String
        }
    },
    targetHash:{
        type: String,
        required: [true, "Target hash cannot be empty"],
    },
    proof:[], //Array of strings
    merkleRoot:{
        type: String,
    },
    signature:{
        type: String,
    },
    status:{
        type: String,
        required: [true, "Status cannot be empty"],
        enum: ["pending", "issued"],
    }
});

const MARKSHEET= mongoose.model('Marksheet', marksheetSchema);
export default MARKSHEET;